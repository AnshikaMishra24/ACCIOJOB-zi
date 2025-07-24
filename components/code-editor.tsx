"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Copy, Save } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface CodeEditorProps {
  component: {
    code: string
    css?: string
    name?: string
  }
  onChange?: (updates: Partial<{ code: string; css: string }>) => void
}

export function CodeEditor({ component, onChange }: CodeEditorProps) {
  const [jsxCode, setJsxCode] = useState(component.code || "")
  const [cssCode, setCssCode] = useState(component.css || "")

  useEffect(() => {
    setJsxCode(component.code || "")
    setCssCode(component.css || "")
  }, [component.code, component.css])

  const handleSave = () => {
    if (onChange) {
      onChange({
        code: jsxCode,
        css: cssCode,
      })
      toast({
        title: "Saved!",
        description: "Component code has been updated",
      })
    }
  }

  const handleCopyJSX = () => {
    navigator.clipboard.writeText(jsxCode)
    toast({
      title: "Copied!",
      description: "JSX code copied to clipboard",
    })
  }

  const handleCopyCSS = () => {
    navigator.clipboard.writeText(cssCode)
    toast({
      title: "Copied!",
      description: "CSS code copied to clipboard",
    })
  }

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="border-b p-4 flex justify-between items-center">
        <h3 className="font-semibold">Code Editor</h3>
        <Button onClick={handleSave} size="sm">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="jsx" className="flex-1 flex flex-col">
        <div className="border-b px-4">
          <TabsList>
            <TabsTrigger value="jsx">JSX/TSX</TabsTrigger>
            <TabsTrigger value="css">CSS</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="jsx" className="flex-1 m-0 flex flex-col">
          <div className="p-2 border-b flex justify-end">
            <Button variant="ghost" size="sm" onClick={handleCopyJSX}>
              <Copy className="h-4 w-4 mr-2" />
              Copy JSX
            </Button>
          </div>
          <div className="flex-1 relative">
            <textarea
              value={jsxCode}
              onChange={(e) => setJsxCode(e.target.value)}
              className="w-full h-full p-4 font-mono text-sm border-0 resize-none focus:outline-none"
              placeholder="Your JSX/TSX code will appear here..."
              spellCheck={false}
            />
          </div>
        </TabsContent>

        <TabsContent value="css" className="flex-1 m-0 flex flex-col">
          <div className="p-2 border-b flex justify-end">
            <Button variant="ghost" size="sm" onClick={handleCopyCSS}>
              <Copy className="h-4 w-4 mr-2" />
              Copy CSS
            </Button>
          </div>
          <div className="flex-1 relative">
            <textarea
              value={cssCode}
              onChange={(e) => setCssCode(e.target.value)}
              className="w-full h-full p-4 font-mono text-sm border-0 resize-none focus:outline-none"
              placeholder="Your CSS code will appear here..."
              spellCheck={false}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
