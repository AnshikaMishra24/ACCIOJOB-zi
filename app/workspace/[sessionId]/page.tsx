"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Send,
  Download,
  Copy,
  Sparkles,
  User,
  Bot,
  Code,
  Eye,
  Settings,
  ArrowLeft,
  Brain,
  Zap,
  Box,
  Mic,
  Store,
  Shield,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { useSession } from "@/hooks/use-session"
import { ComponentPreview } from "@/components/component-preview"
import { CodeEditor } from "@/components/code-editor"
import { PropertyEditor } from "@/components/property-editor"
import { AIAnalysis } from "@/components/ai-analysis"
import { PerformanceAnalytics } from "@/components/performance-analytics"
import { Component3DPreview } from "@/components/3d-preview"
import { VoiceChat } from "@/components/voice-chat"
import { ComponentMarketplace } from "@/components/component-marketplace"
import { AICodeReview } from "@/components/ai-code-review"
import { toast } from "@/hooks/use-toast"

export default function WorkspacePage() {
  const params = useParams()
  const sessionId = params.sessionId as string
  const router = useRouter()
  const { user } = useAuth()
  const { session, loading, sendMessage, updateComponent, selectedElement, setSelectedElement } = useSession(sessionId)

  const [message, setMessage] = useState("")
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [session?.messages])

  const handleSendMessage = async () => {
    if (!message.trim() || sending) return

    setSending(true)
    try {
      await sendMessage(message)
      setMessage("")
    } catch (error) {
      console.error("Failed to send message:", error)
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSending(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleCopyCode = () => {
    if (session?.currentComponent?.code) {
      navigator.clipboard.writeText(session.currentComponent.code)
      toast({
        title: "Copied!",
        description: "Component code copied to clipboard",
      })
    }
  }

  const handleDownload = () => {
    if (session?.currentComponent) {
      const component = session.currentComponent
      const zip = `// ${component.name || "Component"}.tsx
${component.code}

/* CSS */
${component.css || "/* No custom CSS */"}`

      const blob = new Blob([zip], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${component.name || "component"}.tsx`
      a.click()
      URL.revokeObjectURL(url)

      toast({
        title: "Downloaded!",
        description: "Component code downloaded successfully",
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Session not found</h2>
          <p className="text-gray-600 mb-4">The session you're looking for doesn't exist.</p>
          <Button onClick={() => router.push("/dashboard")}>Back to Dashboard</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-blue-600" />
            <h1 className="text-lg font-semibold">{session.name}</h1>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {session.currentComponent && (
            <>
              <Button variant="outline" size="sm" onClick={handleCopyCode}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </>
          )}
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Chat Sidebar */}
        <div className="w-80 bg-white border-r flex flex-col">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-gray-900">Chat</h3>
            <p className="text-sm text-gray-600">Describe your component</p>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {session.messages?.map((msg, index) => (
                <div key={index} className="flex space-x-3">
                  <div className="flex-shrink-0">
                    {msg.role === "user" ? (
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Bot className="h-4 w-4 text-purple-600" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm">
                      <span className="font-medium">{msg.role === "user" ? user?.name : "AI Assistant"}</span>
                      <span className="text-gray-500 ml-2">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <div className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{msg.content}</div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Describe your component..."
                className="flex-1 min-h-[60px] resize-none"
                disabled={sending}
              />
              <Button onClick={handleSendMessage} disabled={!message.trim() || sending} size="sm">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {session.currentComponent ? (
            <Tabs defaultValue="preview" className="flex-1 flex flex-col">
              <div className="border-b bg-white px-4">
                <TabsList className="grid grid-cols-8 w-full">
                  <TabsTrigger value="preview">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </TabsTrigger>
                  <TabsTrigger value="code">
                    <Code className="h-4 w-4 mr-2" />
                    Code
                  </TabsTrigger>
                  <TabsTrigger value="properties">
                    <Settings className="h-4 w-4 mr-2" />
                    Properties
                  </TabsTrigger>
                  <TabsTrigger value="ai-analysis">
                    <Brain className="h-4 w-4 mr-2" />
                    AI Analysis
                  </TabsTrigger>
                  <TabsTrigger value="performance">
                    <Zap className="h-4 w-4 mr-2" />
                    Performance
                  </TabsTrigger>
                  <TabsTrigger value="3d-preview">
                    <Box className="h-4 w-4 mr-2" />
                    3D Preview
                  </TabsTrigger>
                  <TabsTrigger value="voice-chat">
                    <Mic className="h-4 w-4 mr-2" />
                    Voice Chat
                  </TabsTrigger>
                  <TabsTrigger value="code-review">
                    <Shield className="h-4 w-4 mr-2" />
                    Code Review
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="preview" className="flex-1 m-0">
                <ComponentPreview
                  component={session.currentComponent}
                  onElementSelect={setSelectedElement}
                  selectedElement={selectedElement}
                />
              </TabsContent>

              <TabsContent value="code" className="flex-1 m-0">
                <CodeEditor component={session.currentComponent} onChange={updateComponent} />
              </TabsContent>

              <TabsContent value="properties" className="flex-1 m-0">
                <PropertyEditor
                  component={session.currentComponent}
                  selectedElement={selectedElement}
                  onChange={updateComponent}
                />
              </TabsContent>

              <TabsContent value="ai-analysis" className="flex-1 m-0">
                <AIAnalysis component={session.currentComponent} />
              </TabsContent>

              <TabsContent value="performance" className="flex-1 m-0">
                <PerformanceAnalytics component={session.currentComponent} />
              </TabsContent>

              <TabsContent value="3d-preview" className="flex-1 m-0">
                <Component3DPreview component={session.currentComponent} />
              </TabsContent>

              <TabsContent value="voice-chat" className="flex-1 m-0">
                <VoiceChat onMessage={sendMessage} />
              </TabsContent>

              <TabsContent value="code-review" className="flex-1 m-0">
                <AICodeReview component={session.currentComponent} />
              </TabsContent>
            </Tabs>
          ) : (
            <Tabs defaultValue="getting-started" className="flex-1 flex flex-col">
              <div className="border-b bg-white px-4">
                <TabsList>
                  <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
                  <TabsTrigger value="marketplace">
                    <Store className="h-4 w-4 mr-2" />
                    Marketplace
                  </TabsTrigger>
                  <TabsTrigger value="voice-chat">
                    <Mic className="h-4 w-4 mr-2" />
                    Voice Chat
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="getting-started" className="flex-1 m-0">
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <Sparkles className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to create something amazing?</h3>
                    <p className="text-gray-600 mb-4">
                      Start by describing the component you want to build in the chat.
                    </p>
                    <Badge variant="secondary">Try: "Create a modern login form with email and password fields"</Badge>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="marketplace" className="flex-1 m-0">
                <ComponentMarketplace />
              </TabsContent>

              <TabsContent value="voice-chat" className="flex-1 m-0">
                <VoiceChat onMessage={sendMessage} />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  )
}
