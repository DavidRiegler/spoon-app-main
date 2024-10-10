'use client'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../Navbar/page'
import { ArrowLeft } from 'lucide-react'

interface User {
  id: string
  name: string
  age: number
  bio: string
  image: string
}

export default function ChatList() {
  const [matches, setMatches] = useState<User[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const storedMatches = localStorage.getItem('matches')
    if (storedMatches) {
      setMatches(JSON.parse(storedMatches))
    }
  }, [])

  return (
    <div className="bg-vanilla min-h-screen">
      <main className="mx-auto px-4 py-6 w-2/3">
        <Navbar />
        <div className='bg-pink-200 rounded-b-xl'>
          <div className='bg-white pt-1 pb-1 rounded-b-xl'>
            <div className="bg-white rounded-xl overflow-hidden">
                <div className="flex items-center justify-between mb-6">
                    <button className="text-pink p-2" onClick={() => window.location.href = '/dating'}>
                        <ArrowLeft size={32} className="" />
                    </button>
                    <h1 className="text-3xl font-bold text-pink">Chats</h1>
                    <div className="w-6"></div>
                </div>
                <ul className="divide-y divide-gray-200">
                    {matches.map((match) => {
                        const storedMatch = JSON.parse(localStorage.getItem(`match_${match.id}`) || '{}'); 
                        return (
                        <li
                            key={match.id}
                            className="p-4 hover:bg-gray-100 cursor-pointer"
                            onClick={() => navigate(`/dating/chat/${match.id}`)}
                        >
                            <div className="flex items-center space-x-4">
                            <img src={`../${storedMatch.image}`} alt={storedMatch.name} className="w-16 h-16 rounded-full object-cover"/> 
                            <div>
                                <h3 className="text-lg font-semibold">{storedMatch.name}</h3>
                                <p className="text-gray-500">{storedMatch.bio}</p>
                            </div>
                            </div>
                        </li>
                        );
                    })}
                </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
