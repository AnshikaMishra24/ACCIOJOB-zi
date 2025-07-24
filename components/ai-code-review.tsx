"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, CheckCircle, AlertTriangle, XCircle, Code, Bug, Lightbulb, Target, TrendingUp } from "lucide-react"

interface AICodeReviewProps {
  component:
    | {
        code: string
        css?: string
        name?: string
      }
    | undefined
}

export function AICodeReview({ component }: AICodeReviewProps) {
  const [review, setReview] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (component?.code) {
      performCodeReview()
    }
  }, [component?.code])

  const performCodeReview = async () => {
    setLoading(true)

    // Simulate AI code review
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const mockReview = {
      overallScore: 85,
      issues: [
        {
          type: "error",
          severity: "high",
          line: 15,
          message: "Missing key prop in map function",
          suggestion: "Add unique key prop to each mapped element",
          category: "React Best Practices",
        },
        {
          type: "warning",
          severity: "medium",
          line: 23,
          message: "Inline function in JSX may cause unnecessary re-renders",
          suggestion: "Extract function to component level or use useCallback",
          category: "Performance",
        },
        {
          type: "info",
          severity: "low",
          line: 8,
          message: "Consider using semantic HTML elements",
          suggestion: "Replace div with more semantic elements like section or article",
          category: "Accessibility",
        },
      ],
      metrics: {
        complexity: 3.2,
        maintainability: 78,
        testability: 82,
        performance: 88,
        security: 95,
      },
      suggestions: [
        "Add PropTypes or TypeScript interfaces for better type safety",
        "Implement error boundaries for better error handling",
        "Consider memoization for expensive calculations",
        "Add loading states for better user experience",
      ],
      bestPractices: {
        followed: 12,
        total: 15,
        violations: ["Missing error boundaries", "No loading states", "Inline event handlers"],
      },
    }

    setReview(mockReview)
    setLoading(false)
  }

  if (!component) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="text-center">
          <Shield className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Code to Review</h3>
          <p className="text-gray-600">Generate a component first to see AI-powered code review</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Reviewing Code...</h3>
          <p className="text-gray-600">Analyzing code quality, performance, and best practices</p>
        </div>
      </div>
    )
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-600 bg-red-50 border-red-200"
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "low":
        return "text-blue-600 bg-blue-50 border-blue-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getSeverityIcon = (type: string) => {
    switch (type) {
      case "error":
        return <XCircle className="h-5 w-5 text-red-600" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case "info":
        return <CheckCircle className="h-5 w-5 text-blue-600" />
      default:
        return <CheckCircle className="h-5 w-5 text-gray-600" />
    }
  }

  return (
    <div className="h-full bg-gray-50 p-6 overflow-auto">
      <div className="space-y-6">
        {/* Overall Score */}
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Shield className="h-6 w-6 text-purple-600 mr-2" />
                AI Code Review
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-purple-600">{review?.overallScore}/100</span>
                <Badge variant="secondary">Good Quality</Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={review?.overallScore} className="mb-4" />
            <p className="text-gray-600">Your code shows good quality with some areas for improvement</p>
          </CardContent>
        </Card>

        <Tabs defaultValue="issues" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="issues">
              <Bug className="h-4 w-4 mr-2" />
              Issues ({review?.issues.length})
            </TabsTrigger>
            <TabsTrigger value="metrics">
              <TrendingUp className="h-4 w-4 mr-2" />
              Metrics
            </TabsTrigger>
            <TabsTrigger value="suggestions">
              <Lightbulb className="h-4 w-4 mr-2" />
              Suggestions
            </TabsTrigger>
            <TabsTrigger value="practices">
              <Target className="h-4 w-4 mr-2" />
              Best Practices
            </TabsTrigger>
          </TabsList>

          <TabsContent value="issues">
            <div className="space-y-4">
              {review?.issues.map((issue: any, index: number) => (
                <Card key={index} className={`border-l-4 ${getSeverityColor(issue.severity)}`}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-base">
                      <div className="flex items-center">
                        {getSeverityIcon(issue.type)}
                        <span className="ml-2">{issue.message}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">Line {issue.line}</Badge>
                        <Badge variant="secondary">{issue.category}</Badge>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-sm mb-1">Suggestion:</h4>
                        <p className="text-sm text-gray-700">{issue.suggestion}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Code className="h-4 w-4 mr-2" />
                        Apply Fix
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="metrics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Code Complexity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">{review?.metrics.complexity}</div>
                    <div className="text-sm text-gray-600">Cyclomatic Complexity</div>
                    <Progress value={review?.metrics.complexity * 10} className="mt-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Maintainability</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">{review?.metrics.maintainability}</div>
                    <div className="text-sm text-gray-600">Maintainability Index</div>
                    <Progress value={review?.metrics.maintainability} className="mt-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Testability</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">{review?.metrics.testability}</div>
                    <div className="text-sm text-gray-600">Testability Score</div>
                    <Progress value={review?.metrics.testability} className="mt-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600 mb-2">{review?.metrics.security}</div>
                    <div className="text-sm text-gray-600">Security Score</div>
                    <Progress value={review?.metrics.security} className="mt-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="suggestions">
            <div className="space-y-4">
              {review?.suggestions.map((suggestion: string, index: number) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Lightbulb className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm">{suggestion}</p>
                        <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                          Learn More
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="practices">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Best Practices Compliance</span>
                    <div className="text-2xl font-bold text-green-600">
                      {review?.bestPractices.followed}/{review?.bestPractices.total}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress
                    value={(review?.bestPractices.followed / review?.bestPractices.total) * 100}
                    className="mb-4"
                  />
                  <p className="text-sm text-gray-600">
                    Following {review?.bestPractices.followed} out of {review?.bestPractices.total} recommended
                    practices
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Areas for Improvement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {review?.bestPractices.violations.map((violation: string, index: number) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                        <XCircle className="h-5 w-5 text-red-600" />
                        <span className="text-sm">{violation}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
