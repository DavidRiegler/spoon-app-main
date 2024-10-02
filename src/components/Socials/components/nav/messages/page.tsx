'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navigation } from "../../navigation";
import { Trends } from "../../trends";

export default function Messages() {
  const router = useRouter();
  const [selectedChat, setSelectedChat] = useState<number | null>(null);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  const chats = [
    { id: 1, user: 'TechGuru', lastMessage: 'Hey, how\'s it going?', time: '2h ago' },
    { id: 2, user: 'CodeMaster', lastMessage: 'Did you see the new React update?', time: '1d ago' },
    { id: 3, user: 'DesignPro', lastMessage: 'Can you review my latest design?', time: '3d ago' },
  ];

  const messages = [
    { id: 1, sender: 'TechGuru', content: 'Hey, how\'s it going?', time: '2:30 PM' },
    { id: 2, sender: 'You', content: 'Not bad, just working on a new project. You?', time: '2:35 PM' },
    { id: 3, sender: 'TechGuru', content: 'Same here! Working on a new app. Want to collaborate?', time: '2:40 PM' },
  ];

  return (
    <div className="container mx-auto flex min-h-screen">
      <Navigation onLogout={handleLogout} />
      <main className="w-1/2 border-r p-4 flex">
        <div className="w-1/3 border-r pr-4">
          <h2 className="mb-4 text-xl font-bold">Messages</h2>
          {chats.map((chat) => (
            <div 
              key={chat.id} 
              className={`mb-2 p-4 rounded-lg cursor-pointer transition-colors duration-200 ${selectedChat === chat.id ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
              onClick={() => setSelectedChat(chat.id)}
            >
              <p className="font-medium">{chat.user}</p>
              <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
              <p className="text-xs text-gray-400">{chat.time}</p>
            </div>
          ))}
        </div>
        <div className="w-2/3 pl-4">
          {selectedChat ? (
            <>
              <h2 className="mb-4 text-xl font-bold">{chats.find(chat => chat.id === selectedChat)?.user}</h2>
              <div className="space-y-4 mb-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs p-2 rounded-lg ${message.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                      <p>{message.content}</p>
                      <p className="text-xs text-right mt-1">{message.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex">
                <input 
                  type="text" 
                  placeholder="Type a message..." 
                  className="mr-2 p-2 border border-gray-300 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">Send</button>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500 mt-10">Select a chat to start messaging</p>
          )}
        </div>
      </main>
      <Trends />
    </div>
  );
}
