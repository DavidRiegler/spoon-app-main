import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import AnimatedCard from './animatedCard'

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

export default function SwipeArea({ users, onSwipe }: SwipeAreaProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<'left' | 'right' | 'up' | null>(null)

  if (currentIndex >= users.length) {
    return <div className="text-2xl font-bold text-gray-500">No more profiles to show!</div>
  }

  const currentUser = users[currentIndex]

  const handleSwipe = (newDirection: 'left' | 'right' | 'up') => {
    setDirection(newDirection)
    setTimeout(() => {
      onSwipe(newDirection)
      setCurrentIndex(prevIndex => prevIndex + 1)
      setDirection(null)
    }, 500)
  }

  return (
    <div className="relative w-full max-w-sm aspect-[3/4]">
      <AnimatePresence>
        {direction === null && (
          <AnimatedCard
            key={currentUser.id}
            user={currentUser}
            direction={direction}
            onSwipe={handleSwipe}
          />
        )}
      </AnimatePresence>
    </div>
  )
}