import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaStar, FaHeart } from 'react-icons/fa'

interface ActionButtonsProps {
  onSwipe: (direction: 'left' | 'right' | 'up') => void
}

export default function ActionButtons({ onSwipe }: ActionButtonsProps) {
  const [showPopup, setShowPopup] = useState<'dislike' | 'superlike' | 'like' | null>(null)

  const handleSwipe = (direction: 'left' | 'right' | 'up') => {
    onSwipe(direction)
    setShowPopup(direction === 'left' ? 'dislike' : direction === 'right' ? 'like' : 'superlike')
    setTimeout(() => setShowPopup(null), 1000)
  }

  return (
    <div className="relative flex justify-center space-x-4 mt-4">
      <button
        className="bg-white text-red-500 rounded-full p-4 shadow-lg focus:outline-none hover:bg-red-100 transition-colors transform hover:scale-110 active:scale-95"
        onClick={() => handleSwipe('left')}
      >
        <FaTimes size={24} />
      </button>
      <button
        className="bg-white text-blue-500 rounded-full p-4 shadow-lg focus:outline-none hover:bg-blue-100 transition-colors transform hover:scale-110 active:scale-95"
        onClick={() => handleSwipe('up')}
      >
        <FaStar size={24} />
      </button>
      <button
        className="bg-white text-green-500 rounded-full p-4 shadow-lg focus:outline-none hover:bg-green-100 transition-colors transform hover:scale-110 active:scale-95"
        onClick={() => handleSwipe('right')}
      >
        <FaHeart size={24} />
      </button>
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed top-1/2 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={`text-8xl font-bold ${
              showPopup === 'dislike' ? 'text-red-500' :
              showPopup === 'superlike' ? 'text-blue-500' :
              'text-green-500'
            }`}>
              {showPopup === 'dislike' ? 'NOPE' :
               showPopup === 'superlike' ? 'SUPER LIKE' :
               'LIKE'}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}