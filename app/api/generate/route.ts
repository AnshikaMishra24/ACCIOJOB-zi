import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    // Simple mock response for testing
    const mockResponse = `Here's a React component based on your request:

\`\`\`tsx
function ${prompt.includes("button") ? "CustomButton" : "CustomComponent"}() {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Generated Component</h2>
      <p className="text-gray-600">This is a generated component based on: "${prompt}"</p>
      ${
        prompt.includes("button")
          ? `
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Click Me
      </button>`
          : ""
      }
    </div>
  )
}
\`\`\`

This component is responsive and uses Tailwind CSS for styling.`

    return NextResponse.json({
      success: true,
      response: mockResponse,
    })
  } catch (error) {
    console.error("Generate API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to generate component" }, { status: 500 })
  }
}
