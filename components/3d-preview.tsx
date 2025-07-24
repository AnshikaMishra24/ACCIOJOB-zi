"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Box, RotateCcw, Move3D, Layers, Eye, Settings } from "lucide-react"

interface Component3DPreviewProps {
  component:
    | {
        code: string
        css?: string
        name?: string
      }
    | undefined
}

export function Component3DPreview({ component }: Component3DPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [rotation, setRotation] = useState([45])
  const [zoom, setZoom] = useState([1])
  const [perspective, setPerspective] = useState([800])
  const [isAnimating, setIsAnimating] = useState(false)
  const [viewMode, setViewMode] = useState<"wireframe" | "solid" | "layers">("solid")

  useEffect(() => {
    if (component?.code && canvasRef.current) {
      render3DPreview()
    }
  }, [component, rotation, zoom, perspective, viewMode])

  const render3DPreview = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set up 3D transformation
    ctx.save()
    ctx.translate(canvas.width / 2, canvas.height / 2)

    // Apply perspective and rotation
    const rotationAngle = (rotation[0] * Math.PI) / 180
    const zoomFactor = zoom[0]

    // Draw 3D representation of the component
    drawComponent3D(ctx, rotationAngle, zoomFactor)

    ctx.restore()
  }

  const drawComponent3D = (ctx: CanvasRenderingContext2D, rotation: number, zoom: number) => {
    // Simulate 3D component visualization
    const layers = [
      { name: "Background", color: "#f3f4f6", depth: 0 },
      { name: "Container", color: "#e5e7eb", depth: 20 },
      { name: "Content", color: "#d1d5db", depth: 40 },
      { name: "Interactive Elements", color: "#3b82f6", depth: 60 },
    ]

    layers.forEach((layer, index) => {
      ctx.save()

      // Apply 3D transformation
      const offsetX = Math.cos(rotation) * layer.depth * zoom
      const offsetY = Math.sin(rotation) * layer.depth * 0.5 * zoom

      ctx.translate(offsetX, offsetY)
      ctx.scale(zoom, zoom)

      // Draw layer based on view mode
      if (viewMode === "wireframe") {
        ctx.strokeStyle = layer.color
        ctx.lineWidth = 2
        ctx.strokeRect(-100, -60, 200, 120)
      } else if (viewMode === "solid") {
        ctx.fillStyle = layer.color
        ctx.fillRect(-100, -60, 200, 120)
        ctx.strokeStyle = "#374151"
        ctx.lineWidth = 1
        ctx.strokeRect(-100, -60, 200, 120)
      } else if (viewMode === "layers") {
        ctx.fillStyle = layer.color + "80" // Add transparency
        ctx.fillRect(-100, -60, 200, 120)
        ctx.strokeStyle = layer.color
        ctx.lineWidth = 2
        ctx.strokeRect(-100, -60, 200, 120)

        // Add layer label
        ctx.fillStyle = "#1f2937"
        ctx.font = "12px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(layer.name, 0, -70)
      }

      ctx.restore()
    })

    // Add depth indicators
    if (viewMode === "layers") {
      ctx.strokeStyle = "#6b7280"
      ctx.setLineDash([5, 5])
      layers.forEach((layer, index) => {
        if (index > 0) {
          const prevOffsetX = Math.cos(rotation) * layers[index - 1].depth * zoom
          const prevOffsetY = Math.sin(rotation) * layers[index - 1].depth * 0.5 * zoom
          const currOffsetX = Math.cos(rotation) * layer.depth * zoom
          const currOffsetY = Math.sin(rotation) * layer.depth * 0.5 * zoom

          ctx.beginPath()
          ctx.moveTo(prevOffsetX - 100, prevOffsetY - 60)
          ctx.lineTo(currOffsetX - 100, currOffsetY - 60)
          ctx.stroke()
        }
      })
      ctx.setLineDash([])
    }
  }

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating)
    if (!isAnimating) {
      const animate = () => {
        setRotation((prev) => [(prev[0] + 1) % 360])
        if (isAnimating) {
          requestAnimationFrame(animate)
        }
      }
      animate()
    }
  }

  const resetView = () => {
    setRotation([45])
    setZoom([1])
    setPerspective([800])
    setIsAnimating(false)
  }

  if (!component) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="text-center">
          <Box className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No 3D Preview Available</h3>
          <p className="text-gray-600">Generate a component to see its 3D visualization</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full bg-gray-900 flex">
      {/* 3D Canvas */}
      <div className="flex-1 relative">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="w-full h-full"
          style={{ background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)" }}
        />

        {/* Overlay Controls */}
        <div className="absolute top-4 left-4 space-y-2">
          <Badge variant="secondary" className="bg-black/50 text-white">
            3D Component Visualization
          </Badge>
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant={viewMode === "solid" ? "default" : "outline"}
              onClick={() => setViewMode("solid")}
              className="bg-black/50 text-white border-white/20"
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant={viewMode === "wireframe" ? "default" : "outline"}
              onClick={() => setViewMode("wireframe")}
              className="bg-black/50 text-white border-white/20"
            >
              <Box className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant={viewMode === "layers" ? "default" : "outline"}
              onClick={() => setViewMode("layers")}
              className="bg-black/50 text-white border-white/20"
            >
              <Layers className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="absolute top-4 right-4 space-y-2">
          <Button
            size="sm"
            onClick={toggleAnimation}
            className="bg-black/50 text-white border-white/20"
            variant={isAnimating ? "default" : "outline"}
          >
            <Move3D className="h-4 w-4 mr-2" />
            {isAnimating ? "Stop" : "Animate"}
          </Button>
          <Button size="sm" onClick={resetView} className="bg-black/50 text-white border-white/20" variant="outline">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Control Panel */}
      <div className="w-80 bg-white border-l p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            3D Controls
          </h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Rotation: {rotation[0]}°</label>
            <Slider value={rotation} onValueChange={setRotation} max={360} min={0} step={1} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Zoom: {zoom[0].toFixed(1)}x</label>
            <Slider value={zoom} onValueChange={setZoom} max={3} min={0.1} step={0.1} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Perspective: {perspective[0]}px</label>
            <Slider value={perspective} onValueChange={setPerspective} max={2000} min={200} step={50} />
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium">View Modes</h4>
          <div className="space-y-2">
            <Button
              variant={viewMode === "solid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("solid")}
              className="w-full justify-start"
            >
              <Eye className="h-4 w-4 mr-2" />
              Solid View
            </Button>
            <Button
              variant={viewMode === "wireframe" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("wireframe")}
              className="w-full justify-start"
            >
              <Box className="h-4 w-4 mr-2" />
              Wireframe
            </Button>
            <Button
              variant={viewMode === "layers" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("layers")}
              className="w-full justify-start"
            >
              <Layers className="h-4 w-4 mr-2" />
              Layer View
            </Button>
          </div>
        </div>

        <div className="pt-4 border-t">
          <h4 className="font-medium mb-2">Component Layers</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span>Interactive Elements</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-400 rounded"></div>
              <span>Content Layer</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-300 rounded"></div>
              <span>Container</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-200 rounded"></div>
              <span>Background</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
