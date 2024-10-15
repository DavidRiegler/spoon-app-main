'use client'

import React, { useState, useEffect, useRef } from 'react'
import { ArrowLeft, Send } from 'lucide-react'

interface Message {
  text: string
  sender: 'user' | 'bot'
  timestamp: number
}

const botOptionsMessage: Message = {
  text: `Please choose the number corresponding to your needs for a more efficient service:
1. Order Management
2. Payments Management
3. Account management and profile
4. About order tracking
5. Safety`,
  sender: 'bot',
  timestamp: Date.now(),
}

export default function Support() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [awaitingResponse, setAwaitingResponse] = useState(false)
  const lastMessageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const storedMessages = localStorage.getItem('chatMessages')
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages))
    }

    return () => {
      localStorage.removeItem('chatMessages')
    }
  }, [])

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages))
    }
  }, [messages])

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputText.trim() === '') return

    const newUserMessage: Message = {
      text: inputText,
      sender: 'user',
      timestamp: Date.now(),
    }

    setMessages((prevMessages) => [...prevMessages, newUserMessage])
    setInputText('')

    if (!awaitingResponse) {
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, botOptionsMessage])
        setAwaitingResponse(true)
      }, 1000)
    } else {
      setTimeout(() => {
        const botResponse: Message = {
          text: getBotResponse(inputText),
          sender: 'bot',
          timestamp: Date.now(),
        }
        setMessages((prevMessages) => [...prevMessages, botResponse])
      }, 1000)
    }
  }

  const getBotResponse = (userInput: string): string => {
    const option = parseInt(userInput)

    if (!awaitingResponse) {
      return "Please respond with a number between 1 and 5."
    }

    switch (option) {
      case 1:
        return `You have a current order:
        Strawberry Shake and Broccoli Lasagna
        Order No. 0054752
        29 Nov, 01:20 pm.`
      case 2:
        return "Here's information about Payments Management..."
      case 3:
        return "Here's information about Account management and profile..."
      case 4:
        return "Here's information about order tracking..."
      case 5:
        return "Here's information about Safety..."
      default:
        return "I'm sorry, I didn't understand that. Please choose a number between 1 and 5."
    }
  }

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="bg-vanilla min-h-screen">
      <main className="mx-auto px-4 py-4 w-2/3">
        <div className='bg-pink-200 rounded-b-xl'>
          <div className='bg-white pt-1 pb-1 rounded-b-xl'>
            <div className="bg-white flex flex-col" style={{ height: '94vh' }}>
              <div className="bg-white p-4 flex items-center space-x-4">
                <button onClick={() => window.history.back()}>
                  <ArrowLeft className="text-lila" />
                </button>
                <h2 className="text-xl font-semibold text-lila flex-grow text-center">Support</h2>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    ref={index === messages.length - 1 ? lastMessageRef : null}
                  >
                    <div
                      className={`rounded-2xl p-3 max-w-[70%] ${
                        message.sender === 'user'
                          ? 'bg-vanilla text-black'
                          : 'bg-white border border-pink-200 text-black'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.text}</p>
                      <div className="text-xs text-gray-500 mt-1">
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendMessage} className="bg-pink-200 p-2">
                <div className="flex items-center space-x-2 rounded-full p-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Write Here..."
                    className="flex-1 bg-gray-200 p-2 placeholder:font-semibold rounded-full focus:outline-none"
                  />
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
