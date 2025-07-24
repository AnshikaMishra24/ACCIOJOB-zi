"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, CheckCircle, AlertTriangle, TrendingUp, Shield, Zap, Users, Sparkles } from "lucide-react"

interface AIAnalysisProps {
  component:
    | {
        code: string
        css?: string
        name?: string
      }
    | undefined
}

export function AIAnalysis({ component }: AIAnalysisProps) {
  const [analysis, setAnalysis] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [improvements, setImprovements] = useState<string[]>([])

  useEffect(() => {
    if (component?.code) {
      analyzeComponent()
    }
  }, [component?.code])

  const analyzeComponent = async () => {
    setLoading(true)

    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const mockAnalysis = {
      overallScore: 87,
      accessibility: {
        score: 92,
        issues: [
          { type: "warning", message: "Consider adding aria-labels for better screen reader support" },
          { type: "success", message: "Proper semantic HTML structure detected" },
        ],
      },
      performance: {
        score: 85,
        metrics: {
          bundleSize: "2.3kb",
          renderTime: "12ms",
          memoryUsage: "1.2MB",
        },
        suggestions: ["Consider lazy loading for heavy components", "Optimize re-renders with React.memo"],
      },
      security: {
        score: 95,
        vulnerabilities: [],
        recommendations: ["Input sanitization looks good", "No XSS vulnerabilities detected"],
      },
      codeQuality: {
        score: 88,
        metrics: {
          complexity: "Low",
          maintainability: "High",
          testability: "Good",
        },
      },
      suggestions: [
        "Add PropTypes or TypeScript interfaces for better type safety",
        "Consider extracting inline styles to CSS modules",
        "Add error boundaries for better error handling",
        "Implement loading states for better UX",
      ],
    }

    setAnalysis(mockAnalysis)
    setImprovements([
      "Enhanced accessibility with ARIA attributes",
      "Optimized performance with React.memo",
      "Added TypeScript interfaces",
      "Implemented error boundaries",
    ])
    setLoading(false)
  }

  const applyAIImprovements = async () => {
    // This would integrate with the AI to automatically improve the component
    console.log("Applying AI improvements...")
  }

  if (!component) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="text-center">
          <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Component to Analyze</h3>
          <p className="text-gray-600">Generate a component first to see AI-powered analysis</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Analyzing Component...</h3>
          <p className="text-gray-600">Checking accessibility, performance, security, and code quality</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full bg-gray-50 p-6 overflow-auto">
      <div className="space-y-6">
        {/* Overall Score */}
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Brain className="h-6 w-6 text-blue-600 mr-2" />
                AI Component Analysis
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-blue-600">{analysis?.overallScore}/100</span>
                <Badge variant="secondary">Excellent</Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={analysis?.overallScore} className="mb-4" />
            <div className="flex justify-between items-center">
              <p className="text-gray-600">Your component shows excellent quality across all metrics</p>
              <Button onClick={applyAIImprovements} className="bg-gradient-to-r from-purple-600 to-blue-600">
                <Sparkles className="h-4 w-4 mr-2" />
                Auto-Improve with AI
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Analysis Tabs */}
        <Tabs defaultValue="accessibility" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="accessibility">
              <Users className="h-4 w-4 mr-2" />
              Accessibility
            </TabsTrigger>
            <TabsTrigger value="performance">
              <Zap className="h-4 w-4 mr-2" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="quality">
              <TrendingUp className="h-4 w-4 mr-2" />
              Code Quality
            </TabsTrigger>
          </TabsList>

          <TabsContent value="accessibility">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Accessibility Analysis</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-green-600">{analysis?.accessibility.score}/100</span>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      Excellent
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analysis?.accessibility.issues.map((issue: any, index: number) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                      {issue.type === "success" ? (
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      )}
                      <span className="text-sm">{issue.message}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Performance Metrics</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-blue-600">{analysis?.performance.score}/100</span>
                    <Badge variant="outline" className="text-blue-600 border-blue-600">
                      Good
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{analysis?.performance.metrics.bundleSize}</div>
                    <div className="text-sm text-gray-600">Bundle Size</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{analysis?.performance.metrics.renderTime}</div>
                    <div className="text-sm text-gray-600">Render Time</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {analysis?.performance.metrics.memoryUsage}
                    </div>
                    <div className="text-sm text-gray-600">Memory Usage</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Optimization Suggestions:</h4>
                  {analysis?.performance.suggestions.map((suggestion: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      <span>{suggestion}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Security Analysis</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-green-600">{analysis?.security.score}/100</span>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      Secure
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analysis?.security.recommendations.map((rec: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-green-50">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span className="text-sm">{rec}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quality">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Code Quality Metrics</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-blue-600">{analysis?.codeQuality.score}/100</span>
                    <Badge variant="outline" className="text-blue-600 border-blue-600">
                      High Quality
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">{analysis?.codeQuality.metrics.complexity}</div>
                    <div className="text-sm text-gray-600">Complexity</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">
                      {analysis?.codeQuality.metrics.maintainability}
                    </div>
                    <div className="text-sm text-gray-600">Maintainability</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">{analysis?.codeQuality.metrics.testability}</div>
                    <div className="text-sm text-gray-600">Testability</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* AI Suggestions */}
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="h-5 w-5 text-purple-600 mr-2" />
              AI-Powered Improvements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analysis?.suggestions.map((suggestion: string, index: number) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-purple-50">
                  <Brain className="h-5 w-5 text-purple-600 mt-0.5" />
                  <span className="text-sm">{suggestion}</span>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600">
              Apply All Improvements Automatically
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
