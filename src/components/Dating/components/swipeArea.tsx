import { useState } from 'react'

interface User {
  id: string
  name: string
  age: number
  bio: string
  image: string
}

interface SwipeAreaProps {
  users: User[]
  onSwipe: (direction: 'left' | 'right' | 'up') => void
}

export default function SwipeArea({ users }: SwipeAreaProps) {
  const [currentIndex] = useState(0)

  if (currentIndex >= users.length) {
    return <div className="text-2xl font-bold text-gray-500">No more profiles to show!</div>
  }

  const currentUser = users[currentIndex]

  return (
    <div className="relative w-full max-w-sm aspect-[3/4] bg-white shadow-lg rounded-lg overflow-hidden">
      <img
        src={currentUser.image}
        alt={currentUser.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent text-white">
        <h2 className="text-2xl font-semibold">{currentUser.name}, {currentUser.age}</h2>
        <p className="mt-2">{currentUser.bio}</p>
      </div>
    </div>
  )
}