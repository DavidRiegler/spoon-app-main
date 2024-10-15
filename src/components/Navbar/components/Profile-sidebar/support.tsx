import React, { useState, useEffect } from 'react';
import { ChevronLeft } from 'react-feather';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: number;
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
};

export default function Support() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [awaitingResponse, setAwaitingResponse] = useState(false);

  useEffect(() => {
    const storedMessages = localStorage.getItem('chatMessages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }

    return () => {
      localStorage.removeItem('chatMessages');
    };
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;

    const newUserMessage: Message = {
      text: inputText,
      sender: 'user',
      timestamp: Date.now(),
    };

    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputText('');

    if (!awaitingResponse) {
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, botOptionsMessage]);
        setAwaitingResponse(true);
      }, 1000);
    } else {
      setTimeout(() => {
        const botResponse: Message = {
          text: getBotResponse(inputText),
          sender: 'bot',
          timestamp: Date.now(),
        };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      }, 1000);
    }
  };

  const getBotResponse = (userInput: string): string => {
    const option = parseInt(userInput);

    if (!awaitingResponse) {
      return "Please respond with a number between 1 and 5.";
    }

    switch (option) {
      case 1:
        return `You have a current order:
        Strawberry Shake and Broccoli Lasagna
        Order No. 0054752
        29 Nov, 01:20 pm.`;
      case 2:
        return "Here's information about Payments Management...";
      case 3:
        return "Here's information about Account management and profile...";
      case 4:
        return "Here's information about order tracking...";
      case 5:
        return "Here's information about Safety...";
      default:
        return "I'm sorry, I didn't understand that. Please choose a number between 1 and 5.";
    }
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen max-h-screen bg-vanilla flex flex-col">
      <header className="w-full bg-vanilla p-4 flex items-center">
        <button className="text-lila" onClick={() => window.history.back()}>
          <ChevronLeft />
        </button>
        <h1 className="text-2xl font-bold text-lila flex-grow text-center">Support</h1>
        <div className="w-6 h-6 bg-vanilla"></div>
      </header>
      <main className="flex-grow w-full max-w-md mx-auto p-4 flex flex-col space-y-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-[#f0e6b3] text-gray-800 border-gray-600 border-2'
                  : 'bg-white text-gray-800 border-gray-600 border-2'
              }`}
            >
              <p className="whitespace-pre-wrap">{message.text}</p>
              <p className="text-xs text-gray-500 mt-1">{formatTime(message.timestamp)}</p>
            </div>
          </div>
        ))}
      </main>
      <footer className="bg-lila p-4">
        <div className="flex items-center bg-white rounded-full">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Write Here..."
            className="flex-grow px-4 py-2 bg-transparent outline-none"
          />
          <button
            onClick={handleSendMessage}
            className="p-2 text-lila"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </footer>
    </div>
  );
}
