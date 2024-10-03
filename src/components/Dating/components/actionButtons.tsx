import { FaTimes, FaStar, FaHeart } from 'react-icons/fa'

interface ActionButtonsProps {
  onSwipe: (direction: 'left' | 'right' | 'up') => void
}

export default function ActionButtons({ onSwipe }: ActionButtonsProps) {
  return (
    <div className="flex justify-center space-x-4 mt-4">
      <button
        className="bg-white text-red-500 rounded-full p-4 shadow-lg focus:outline-none hover:bg-red-100 transition-colors transform hover:scale-110 active:scale-95"
        onClick={() => onSwipe('left')}
      >
        <FaTimes size={24} />
      </button>
      <button
        className="bg-white text-blue-500 rounded-full p-4 shadow-lg focus:outline-none hover:bg-blue-100 transition-colors transform hover:scale-110 active:scale-95"
        onClick={() => onSwipe('up')}
      >
        <FaStar size={24} />
      </button>
      <button
        className="bg-white text-green-500 rounded-full p-4 shadow-lg focus:outline-none hover:bg-green-100 transition-colors transform hover:scale-110 active:scale-95"
        onClick={() => onSwipe('right')}
      >
        <FaHeart size={24} />
      </button>
    </div>
  )
}