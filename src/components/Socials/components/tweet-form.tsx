import { useState } from "react";

interface TweetFormProps {
  onSubmit: (content: string) => void;
}

export function TweetForm({ onSubmit }: TweetFormProps) {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content);
      setContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea
        placeholder="What's happening?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-20 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
      />
      <button
        type="submit"
        className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Tweet
      </button>
    </form>
  );
}
