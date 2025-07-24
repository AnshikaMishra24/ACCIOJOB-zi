"use client"

import { useState, useEffect } from "react"

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

export function useSessions() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSessions()
  }, [])

  const loadSessions = () => {
    const savedSessions = localStorage.getItem("sessions")
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions))
    }
    setLoading(false)
  }

  const createSession = async (name: string): Promise<Session> => {
    const newSession: Session = {
      id: Date.now().toString(),
      name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [],
    }

    const updatedSessions = [newSession, ...sessions]
    setSessions(updatedSessions)
    localStorage.setItem("sessions", JSON.stringify(updatedSessions))

    return newSession
  }

  const updateSession = (sessionId: string, updates: Partial<Session>) => {
    const updatedSessions = sessions.map((session) =>
      session.id === sessionId ? { ...session, ...updates, updatedAt: new Date().toISOString() } : session,
    )
    setSessions(updatedSessions)
    localStorage.setItem("sessions", JSON.stringify(updatedSessions))
  }

  return {
    sessions,
    loading,
    createSession,
    updateSession,
  }
}
