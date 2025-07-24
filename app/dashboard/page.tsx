"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Plus, Clock, Code, LogOut } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useSessions } from "@/hooks/use-sessions"

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const { sessions, loading, createSession } = useSessions()
  const router = useRouter()

  const handleCreateSession = async () => {
    try {
      const newSession = await createSession("New Component Session")
      router.push(`/workspace/${newSession.id}`)
    } catch (error) {
      console.error("Failed to create session:", error)
    }
  }

  const handleOpenSession = (sessionId: string) => {
    router.push(`/workspace/${sessionId}`)
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">ComponentAI</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.name}!</h2>
          <p className="text-gray-600">Continue working on your components or start a new session</p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <Button onClick={handleCreateSession} size="lg" className="mr-4">
            <Plus className="h-5 w-5 mr-2" />
            New Component Session
          </Button>
        </div>

        {/* Recent Sessions */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Sessions</h3>

          {sessions.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Code className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">No sessions yet</h4>
                <p className="text-gray-600 mb-4">Create your first component session to get started</p>
                <Button onClick={handleCreateSession}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Session
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sessions.map((session) => (
                <Card key={session.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{session.name}</CardTitle>
                      <Badge variant="secondary">{session.messages?.length || 0} messages</Badge>
                    </div>
                    <CardDescription>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {new Date(session.updatedAt).toLocaleDateString()}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {session.currentComponent && (
                        <div className="text-sm">
                          <span className="font-medium">Current: </span>
                          <span className="text-gray-600">{session.currentComponent.name || "Untitled Component"}</span>
                        </div>
                      )}
                      <Button onClick={() => handleOpenSession(session.id)} className="w-full" variant="outline">
                        Open Session
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
