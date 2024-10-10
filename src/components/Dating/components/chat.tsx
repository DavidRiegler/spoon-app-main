'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { ArrowLeft, Paperclip, Mic, Send } from 'lucide-react'
import Navbar from '../../Navbar/page'

interface User {
  id: string
  name: string
  age: number
  bio: string
  image: string
}

interface Message {
  id: string
  senderId: string
  text: string
  timestamp: number
}

export default function Component() {
  const [match, setMatch] = useState<User | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const { id } = useParams()
  const lastMessageRef = useRef<HTMLDivElement>(null) 

  useEffect(() => {
    const storedMatches = localStorage.getItem('matches')
    if (storedMatches) {
      const matches = JSON.parse(storedMatches)
      const currentMatch = matches.find((m: User) => m.id === id)
      setMatch(currentMatch)
    }

    const storedMessages = localStorage.getItem(`chat_${id}`)
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages))
    }
  }, [id])

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() === '') return

    const message: Message = {
      id: Date.now().toString(),
      senderId: 'currentUser',
      text: newMessage,
      timestamp: Date.now(),
    }

    const updatedMessages = [...messages, message]
    setMessages(updatedMessages)
    localStorage.setItem(`chat_${id}`, JSON.stringify(updatedMessages))
    setNewMessage('')

    const matchResponse: Message = {
      id: Date.now().toString() + '_match',
      senderId: match?.id ?? 'unknown', 
      text: `Danke für deine Nachricht: "${newMessage}"!`, 
      timestamp: Date.now(),
    }

    setTimeout(() => {
      const updatedMessagesWithResponse = [...updatedMessages, matchResponse];
      setMessages(updatedMessagesWithResponse);
      localStorage.setItem(`chat_${id}`, JSON.stringify(updatedMessagesWithResponse));
    }, 1000); 
  }

  if (!match) return <div>Loading...</div>

  return (
    <div className="bg-vanilla min-h-screen">
      <main className="mx-auto px-4 py-4 w-2/3">
        <Navbar />
        <div className='bg-pink-200 rounded-b-xl'>
          <div className='bg-white pt-1 pb-1 rounded-b-xl'>
            <div className="bg-white flex flex-col" style={{ height: '70vh' }}>
            <div className="bg-white p-4 flex items-center space-x-4">
                <button onClick={() => window.location.href = '/dating/chats'}>
                    <ArrowLeft className="text-lila" />
                </button>
                <img src={`../../${match.image}`} alt={match.name} className="w-16 h-16 rounded-full object-cover"/> 
                <h2 className="text-xl font-semibold text-lila">{match.name}</h2>
            </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === 'currentUser' ? 'justify-end' : 'justify-start'}`}
                    ref={index === messages.length - 1 ? lastMessageRef : null} 
                  >
                    <div
                      className={`rounded-2xl p-3 max-w-[70%] ${
                        message.senderId === 'currentUser'
                          ? 'bg-vanilla text-black'
                          : 'bg-white border border-pink-200 text-black'
                      }`}
                    >
                      {message.text}
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendMessage} className="bg-pink-200 p-2">
                <div className="flex items-center space-x-2 rounded-full p-2">
                  <Paperclip className="text-pink" />
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Write Here..."
                    className="flex-1 bg-gray-200 p-2 placeholder:font-semibold rounded-full focus:outline-none"
                  />
                  <Mic className="text-pink" />
                  <button
                    type="submit"
                    className="bg-white text-pink rounded-full p-2 focus:outline-none"
                  >
                    <Send size={22} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
