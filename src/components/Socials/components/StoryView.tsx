import { useState, useEffect } from 'react'
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

interface Story {
  id: number
  username: string
  img: string
  userImg: string
}

interface StoryViewProps {
  stories: Story[]
  initialStoryIndex: number
  onClose: () => void
}

export default function StoryView({ stories, initialStoryIndex, onClose }: StoryViewProps) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(initialStoryIndex)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress(prev => prev + 1)
      } else {
        if (currentStoryIndex < stories.length - 1) {
          setCurrentStoryIndex(prev => prev + 1)
          setProgress(0)
        } else {
          onClose()
        }
      }
    }, 50)

    return () => clearInterval(timer)
  }, [progress, currentStoryIndex, stories.length, onClose])

  const handlePrevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1)
      setProgress(0)
    }
  }

  const handleNextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(prev => prev + 1)
      setProgress(0)
    } else {
      onClose()
    }
  }

  const currentStory = stories[currentStoryIndex]

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="relative w-full h-full max-w-md mx-auto">
        <img
          src={currentStory.img}
          alt={currentStory.username}
          className="w-full h-full object-contain"
        />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-800">
          <div
            className="h-full bg-white transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img
              src={currentStory.userImg}
              alt={currentStory.username}
              className="w-12 h-12 rounded-full border-2 border-white object-cover"
            />
            <span className="text-white font-semibold">{currentStory.username}</span>
          </div>
          <button onClick={onClose} className="text-white">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <button
          onClick={handlePrevStory}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white"
          disabled={currentStoryIndex === 0}
        >
          <ChevronLeftIcon className="w-8 h-8" />
        </button>
        <button
          onClick={handleNextStory}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white"
        >
          <ChevronRightIcon className="w-8 h-8" />
        </button>
      </div>
    </div>
  )
}