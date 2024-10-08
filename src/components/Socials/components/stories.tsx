import { useState } from 'react'
import StoryView from './StoryView'

interface Story {
  id: number
  username: string
  userImg: string
  img: string
  hasStory: boolean
}

interface StoriesProps {
  stories: Story[]
}

export default function Stories({ stories }: StoriesProps) {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null)

  const openStory = (index: number) => {
    setSelectedStoryIndex(index)
  }

  const closeStory = () => {
    setSelectedStoryIndex(null)
  }

  return (
    <>
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide p-4">
        {stories
          .filter(story => story.hasStory)
          .map((story, index) => (
            <div
              key={story.id}
              className="flex flex-col items-center space-y-1 cursor-pointer"
              onClick={() => openStory(index)}
            >
              <div className={`w-16 h-16 ${story.hasStory ? 'bg-gradient-to-tr from-lila to-burnt' : ''} rounded-full p-[2px]`}>
                <img
                  className="w-full h-full object-cover rounded-full border-2 border-white"
                  src={story.userImg}
                  alt={story.username}
                />
              </div>
              <span className="text-xs text-center truncate w-14">{story.username}</span>
            </div>
          ))}
      </div>
      {selectedStoryIndex !== null && (
        <StoryView
          stories={stories}
          initialStoryIndex={selectedStoryIndex}
          onClose={closeStory}
        />
      )}
    </>
  )
}
