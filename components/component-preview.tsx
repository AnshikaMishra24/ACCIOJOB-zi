"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

interface ComponentPreviewProps {
  component: {
    code: string
    css?: string
    name?: string
  }
  onElementSelect?: (element: any) => void
  selectedElement?: any
}

export function ComponentPreview({ component, onElementSelect, selectedElement }: ComponentPreviewProps) {
  const [error, setError] = useState<string | null>(null)
  const [renderedComponent, setRenderedComponent] = useState<React.ReactNode>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (!component.code) return

    try {
      // Create a safe preview environment
      const previewHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
          <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
          <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body { 
              margin: 0; 
              padding: 20px; 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              background: white;
            }
            .preview-container {
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            ${component.css || ""}
          </style>
        </head>
        <body>
          <div id="root"></div>
          <script type="text/babel">
            const { useState, useEffect, useRef } = React;
            
            // Transform the component code to be renderable
            const componentCode = \`${component.code.replace(/`/g, "\\`")}\`;
            
            try {
              // Create a function that returns the component
              const ComponentFunction = new Function('React', 'useState', 'useEffect', 'useRef', \`
                const { useState, useEffect, useRef } = React;
                \${componentCode}
                return typeof Component !== 'undefined' ? Component : 
                       typeof App !== 'undefined' ? App :
                       (() => React.createElement('div', {}, 'Component not found'));
              \`);
              
              const Component = ComponentFunction(React, useState, useEffect, useRef);
              
              const App = () => {
                return React.createElement('div', { 
                  className: 'preview-container',
                  onClick: (e) => {
                    // Handle element selection for property editor
                    if (window.parent && window.parent.postMessage) {
                      window.parent.postMessage({
                        type: 'ELEMENT_SELECTED',
                        element: {
                          tagName: e.target.tagName,
                          className: e.target.className,
                          id: e.target.id,
                          textContent: e.target.textContent
                        }
                      }, '*');
                    }
                  }
                }, React.createElement(Component));
              };
              
              ReactDOM.render(React.createElement(App), document.getElementById('root'));
            } catch (error) {
              document.getElementById('root').innerHTML = \`
                <div style="padding: 20px; color: red; border: 1px solid red; border-radius: 4px; background: #fef2f2;">
                  <strong>Error rendering component:</strong><br>
                  \${error.message}
                </div>
              \`;
            }
          </script>
        </body>
        </html>
      `

      if (iframeRef.current) {
        const iframe = iframeRef.current
        iframe.srcdoc = previewHTML
        setError(null)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred")
    }
  }, [component.code, component.css])

  // Listen for element selection messages from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "ELEMENT_SELECTED" && onElementSelect) {
        onElementSelect(event.data.element)
      }
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [onElementSelect])

  if (error) {
    return (
      <div className="p-4">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Preview Error:</strong> {error}
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="h-full bg-gray-100 p-4">
      <Card className="h-full overflow-hidden">
        <iframe
          ref={iframeRef}
          className="w-full h-full border-0"
          title="Component Preview"
          sandbox="allow-scripts allow-same-origin"
        />
      </Card>
    </div>
  )
}
