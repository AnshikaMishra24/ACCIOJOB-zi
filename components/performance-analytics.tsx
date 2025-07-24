"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Zap, Clock, Database, Cpu, Activity, TrendingUp, TrendingDown, BarChart3 } from "lucide-react"

interface PerformanceAnalyticsProps {
  component:
    | {
        code: string
        css?: string
        name?: string
      }
    | undefined
}

export function PerformanceAnalytics({ component }: PerformanceAnalyticsProps) {
  const [metrics, setMetrics] = useState<any>(null)
  const [realTimeData, setRealTimeData] = useState<any>({})

  useEffect(() => {
    if (component?.code) {
      analyzePerformance()
      startRealTimeMonitoring()
    }
  }, [component?.code])

  const analyzePerformance = async () => {
    // Simulate performance analysis
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setMetrics({
      lighthouse: {
        performance: 94,
        accessibility: 98,
        bestPractices: 92,
        seo: 89,
      },
      vitals: {
        lcp: 1.2, // Largest Contentful Paint
        fid: 8, // First Input Delay
        cls: 0.05, // Cumulative Layout Shift
        fcp: 0.9, // First Contentful Paint
        ttfb: 120, // Time to First Byte
      },
      bundle: {
        size: 2.3,
        gzipped: 0.8,
        treeshaking: 95,
        codesplitting: true,
      },
      runtime: {
        renderTime: 12,
        memoryUsage: 1.2,
        cpuUsage: 15,
        reRenders: 3,
      },
    })
  }

  const startRealTimeMonitoring = () => {
    const interval = setInterval(() => {
      setRealTimeData({
        timestamp: new Date().toLocaleTimeString(),
        renderTime: Math.random() * 20 + 5,
        memoryUsage: Math.random() * 2 + 1,
        cpuUsage: Math.random() * 30 + 10,
      })
    }, 2000)

    return () => clearInterval(interval)
  }

  if (!component) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="text-center">
          <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Performance Data</h3>
          <p className="text-gray-600">Generate a component to see real-time performance analytics</p>
        </div>
      </div>
    )
  }

  if (!metrics) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-pulse">
            <Activity className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Analyzing Performance...</h3>
          <p className="text-gray-600">Running Lighthouse audit and performance tests</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full bg-gray-50 p-6 overflow-auto">
      <div className="space-y-6">
        {/* Real-time Monitoring */}
        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Activity className="h-6 w-6 text-green-600 mr-2" />
                Real-time Performance
              </div>
              <Badge variant="outline" className="text-green-600 border-green-600 animate-pulse">
                Live
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{realTimeData.renderTime?.toFixed(1)}ms</div>
                <div className="text-sm text-gray-600 flex items-center justify-center">
                  <Clock className="h-3 w-3 mr-1" />
                  Render Time
                </div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{realTimeData.memoryUsage?.toFixed(1)}MB</div>
                <div className="text-sm text-gray-600 flex items-center justify-center">
                  <Database className="h-3 w-3 mr-1" />
                  Memory Usage
                </div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{realTimeData.cpuUsage?.toFixed(0)}%</div>
                <div className="text-sm text-gray-600 flex items-center justify-center">
                  <Cpu className="h-3 w-3 mr-1" />
                  CPU Usage
                </div>
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-500 text-center">Last updated: {realTimeData.timestamp}</div>
          </CardContent>
        </Card>

        {/* Lighthouse Scores */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="h-6 w-6 text-yellow-600 mr-2" />
              Lighthouse Audit Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Performance</span>
                <div className="flex items-center space-x-2">
                  <Progress value={metrics.lighthouse.performance} className="w-32" />
                  <span className="font-bold text-green-600">{metrics.lighthouse.performance}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Accessibility</span>
                <div className="flex items-center space-x-2">
                  <Progress value={metrics.lighthouse.accessibility} className="w-32" />
                  <span className="font-bold text-green-600">{metrics.lighthouse.accessibility}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Best Practices</span>
                <div className="flex items-center space-x-2">
                  <Progress value={metrics.lighthouse.bestPractices} className="w-32" />
                  <span className="font-bold text-green-600">{metrics.lighthouse.bestPractices}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">SEO</span>
                <div className="flex items-center space-x-2">
                  <Progress value={metrics.lighthouse.seo} className="w-32" />
                  <span className="font-bold text-yellow-600">{metrics.lighthouse.seo}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Core Web Vitals */}
        <Card>
          <CardHeader>
            <CardTitle>Core Web Vitals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">LCP</span>
                  <TrendingDown className="h-4 w-4 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-600">{metrics.vitals.lcp}s</div>
                <div className="text-xs text-gray-600">Largest Contentful Paint</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">FID</span>
                  <TrendingDown className="h-4 w-4 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-600">{metrics.vitals.fid}ms</div>
                <div className="text-xs text-gray-600">First Input Delay</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">CLS</span>
                  <TrendingDown className="h-4 w-4 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-600">{metrics.vitals.cls}</div>
                <div className="text-xs text-gray-600">Cumulative Layout Shift</div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">FCP</span>
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-blue-600">{metrics.vitals.fcp}s</div>
                <div className="text-xs text-gray-600">First Contentful Paint</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bundle Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Bundle Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Bundle Size</span>
                <span className="font-bold">{metrics.bundle.size}KB</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Gzipped Size</span>
                <span className="font-bold text-green-600">{metrics.bundle.gzipped}KB</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Tree Shaking Efficiency</span>
                <span className="font-bold text-green-600">{metrics.bundle.treeshaking}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Code Splitting</span>
                <Badge variant={metrics.bundle.codesplitting ? "default" : "destructive"}>
                  {metrics.bundle.codesplitting ? "Enabled" : "Disabled"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
