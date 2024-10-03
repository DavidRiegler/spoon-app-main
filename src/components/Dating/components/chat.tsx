import { useState } from 'react'
import { FaArrowLeft, FaPaperPlane } from 'react-icons/fa'

interface ChatProps {
  chatId: string
  matchedUserName: string | null;
  onClose: () => void
}

export default function Chat({ matchedUserName, onClose }: ChatProps) {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    { id: 1, text: 'You matched with me!', sender: 'them' },
  ])

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, { id: messages.length + 1, text: message, sender: 'you' }])
      setMessage('')
    }
  }

  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-[600px]">
      <div className="bg-gray-100 p-4 flex items-center">
        <button onClick={onClose} className="mr-4">
          <FaArrowLeft size={24} className="text-gray-600" />
        </button>
        <h2 className="text-xl font-semibold">Chat with {matchedUserName}</h2> 
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'you' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.sender === 'you' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-gray-100 p-4 flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button onClick={handleSend} className="ml-2 text-blue-500">
          <FaPaperPlane size={24} />
        </button>
      </div>
    </div>
  )
}