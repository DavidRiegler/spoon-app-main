import { useState } from "react"

interface CommentFormProps {
  onSubmit: (content: string) => void
}

export function CommentForm({ onSubmit }: CommentFormProps) {
  const [content, setContent] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (content.trim()) {
      onSubmit(content)
      setContent("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-2">
      <textarea
        placeholder="Add a comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Reply
      </button>
    </form>
  )
}
