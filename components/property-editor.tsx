"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Settings, Palette, Type, Layout } from "lucide-react"

interface PropertyEditorProps {
  component: {
    code: string
    css?: string
    name?: string
  }
  selectedElement?: {
    tagName: string
    className: string
    id: string
    textContent: string
  }
  onChange?: (updates: Partial<{ code: string; css: string }>) => void
}

export function PropertyEditor({ component, selectedElement, onChange }: PropertyEditorProps) {
  const [fontSize, setFontSize] = useState([16])
  const [padding, setPadding] = useState([16])
  const [backgroundColor, setBackgroundColor] = useState("#ffffff")
  const [textColor, setTextColor] = useState("#000000")
  const [borderRadius, setBorderRadius] = useState([4])

  const handleApplyStyles = () => {
    if (!selectedElement || !onChange) return

    const newCSS = `
      ${component.css || ""}
      
      /* Auto-generated styles for ${selectedElement.tagName.toLowerCase()} */
      .selected-element {
        font-size: ${fontSize[0]}px;
        padding: ${padding[0]}px;
        background-color: ${backgroundColor};
        color: ${textColor};
        border-radius: ${borderRadius[0]}px;
      }
    `

    onChange({ css: newCSS })
  }

  return (
    <div className="h-full bg-gray-50 p-4 overflow-auto">
      <div className="space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Settings className="h-5 w-5 mr-2" />
              Property Editor
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedElement ? (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{selectedElement.tagName}</Badge>
                  {selectedElement.className && <Badge variant="secondary">{selectedElement.className}</Badge>}
                </div>
                <p className="text-sm text-gray-600">Click on elements in the preview to edit their properties</p>
              </div>
            ) : (
              <p className="text-sm text-gray-600">
                Click on an element in the preview to start editing its properties
              </p>
            )}
          </CardContent>
        </Card>

        {selectedElement && (
          <>
            {/* Typography */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-base">
                  <Type className="h-4 w-4 mr-2" />
                  Typography
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Font Size: {fontSize[0]}px</Label>
                  <Slider value={fontSize} onValueChange={setFontSize} max={48} min={8} step={1} className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="textColor">Text Color</Label>
                  <Input
                    id="textColor"
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="mt-1 h-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Layout */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-base">
                  <Layout className="h-4 w-4 mr-2" />
                  Layout
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Padding: {padding[0]}px</Label>
                  <Slider value={padding} onValueChange={setPadding} max={64} min={0} step={1} className="mt-2" />
                </div>
                <div>
                  <Label>Border Radius: {borderRadius[0]}px</Label>
                  <Slider
                    value={borderRadius}
                    onValueChange={setBorderRadius}
                    max={32}
                    min={0}
                    step={1}
                    className="mt-2"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Colors */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-base">
                  <Palette className="h-4 w-4 mr-2" />
                  Colors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="backgroundColor">Background Color</Label>
                  <Input
                    id="backgroundColor"
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="mt-1 h-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Apply Button */}
            <Button onClick={handleApplyStyles} className="w-full">
              Apply Changes
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
