"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Play, Code, Eye } from "lucide-react"
import { useRouter } from "next/navigation"
import { ComponentPreview } from "@/components/component-preview"

const demoComponent = {
  name: "Modern Button Component",
  code: `function ModernButton({ children, variant = "primary", size = "md", onClick, disabled = false }) {
  const baseClasses = "font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
  }
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base", 
    lg: "px-6 py-3 text-lg"
  }
  
  return (
    <div className="space-y-4 p-8">
      <h3 className="text-xl font-bold mb-4">Button Variants</h3>
      <div className="flex flex-wrap gap-4">
        <button className={\`\${baseClasses} \${variants.primary} \${sizes.md}\`}>
          Primary Button
        </button>
        <button className={\`\${baseClasses} \${variants.secondary} \${sizes.md}\`}>
          Secondary Button
        </button>
        <button className={\`\${baseClasses} \${variants.danger} \${sizes.md}\`}>
          Danger Button
        </button>
      </div>
      <div className="flex flex-wrap gap-4">
        <button className={\`\${baseClasses} \${variants.primary} \${sizes.sm}\`}>
          Small
        </button>
        <button className={\`\${baseClasses} \${variants.primary} \${sizes.md}\`}>
          Medium
        </button>
        <button className={\`\${baseClasses} \${variants.primary} \${sizes.lg}\`}>
          Large
        </button>
      </div>
    </div>
  )
}

const Component = ModernButton`,
  css: "",
}

export default function DemoPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => router.push("/")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <div>
              <h1 className="text-xl font-semibold">ComponentAI Demo</h1>
              <p className="text-sm text-gray-600">See what you can build</p>
            </div>
          </div>
          <Button onClick={() => router.push("/auth/signup")}>
            <Play className="h-4 w-4 mr-2" />
            Try It Yourself
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Demo Description */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Interactive Demo</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              This demo shows how ComponentAI generates React components from natural language descriptions. The example
              below was created from the prompt: <Badge variant="secondary">"Create a modern button component"</Badge>
            </p>
            <div className="flex space-x-2">
              <Button
                variant={activeTab === "preview" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab("preview")}
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button
                variant={activeTab === "code" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab("code")}
              >
                <Code className="h-4 w-4 mr-2" />
                Code
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Demo Content */}
        <Card className="h-96">
          {activeTab === "preview" ? (
            <ComponentPreview component={demoComponent} />
          ) : (
            <div className="h-full p-4">
              <pre className="h-full overflow-auto text-sm bg-gray-900 text-gray-100 p-4 rounded">
                <code>{demoComponent.code}</code>
              </pre>
            </div>
          )}
        </Card>

        {/* CTA */}
        <div className="text-center mt-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to build your own components?</h3>
          <p className="text-gray-600 mb-6">
            Sign up now and start creating amazing React components with AI assistance
          </p>
          <Button size="lg" onClick={() => router.push("/auth/signup")}>
            Get Started Free
          </Button>
        </div>
      </div>
    </div>
  )
}
