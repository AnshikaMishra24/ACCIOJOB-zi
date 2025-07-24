"use client"

import { useState, useEffect } from "react"
import { useChat } from "ai/react"

interface Session {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  messages?: Array<{
    role: "user" | "assistant"
    content: string
    timestamp: string
  }>
  currentComponent?: {
    name?: string
    code: string
    css?: string
  }
}

export function useSession(sessionId: string) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedElement, setSelectedElement] = useState<any>(null)

  const { messages, append, isLoading, onError } = useChat({
    api: "/api/chat",
    onFinish: (message) => {
      // Extract component code from AI response
      const codeMatch = message.content.match(/```(?:tsx|jsx|javascript|js)\n([\s\S]*?)\n```/)
      const cssMatch = message.content.match(/```css\n([\s\S]*?)\n```/)

      if (codeMatch) {
        const newComponent = {
          name: "Generated Component",
          code: codeMatch[1],
          css: cssMatch ? cssMatch[1] : "",
        }

        updateSession({ currentComponent: newComponent })
      }

      // Add AI message to session
      const aiMessage = {
        role: "assistant" as const,
        content: message.content,
        timestamp: new Date().toISOString(),
      }

      const currentMessages = session?.messages || []
      updateSession({
        messages: [...currentMessages, aiMessage],
      })
    },
    onError: (error) => {
      console.error("Chat error:", error)
    },
  })

  useEffect(() => {
    loadSession()
  }, [sessionId])

  const loadSession = () => {
    const savedSessions = localStorage.getItem("sessions")
    if (savedSessions) {
      const sessions = JSON.parse(savedSessions)
      const foundSession = sessions.find((s: Session) => s.id === sessionId)
      setSession(foundSession || null)
    }
    setLoading(false)
  }

  const updateSession = (updates: Partial<Session>) => {
    if (!session) return

    const updatedSession = {
      ...session,
      ...updates,
      updatedAt: new Date().toISOString(),
    }
    setSession(updatedSession)

    // Update in localStorage
    const savedSessions = localStorage.getItem("sessions")
    if (savedSessions) {
      const sessions = JSON.parse(savedSessions)
      const updatedSessions = sessions.map((s: Session) => (s.id === sessionId ? updatedSession : s))
      localStorage.setItem("sessions", JSON.stringify(updatedSessions))
    }
  }

  const sendMessage = async (content: string) => {
    // Add user message to session immediately
    const userMessage = {
      role: "user" as const,
      content,
      timestamp: new Date().toISOString(),
    }

    const currentMessages = session?.messages || []
    updateSession({
      messages: [...currentMessages, userMessage],
    })

    // Send to AI using the useChat hook
    await append({ role: "user", content })
  }

  const updateComponent = (updates: Partial<{ code: string; css: string }>) => {
    if (!session?.currentComponent) return

    const updatedComponent = {
      ...session.currentComponent,
      ...updates,
    }

    updateSession({ currentComponent: updatedComponent })
  }

  return {
    session,
    loading,
    sendMessage,
    updateComponent,
    selectedElement,
    setSelectedElement,
    isGenerating: isLoading,
  }
}
