// Post.js
import { useState } from 'react'
import { HeartIcon, ChatBubbleOvalLeftIcon, PaperAirplaneIcon, BookmarkIcon, FaceSmileIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import StoryView from './StoryView'

interface PostProps {
  id: number
  username: string
  userImg: string
  img: string
  caption: string
  hasStory?: boolean
  stories: Array<{ id: number, username: string, userImg: string, img: string, hasStory: boolean }>
}

export default function Post({ id, username, userImg, img, caption, hasStory = false, stories }: PostProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [likes, setLikes] = useState(128)
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes(isLiked ? likes - 1 : likes + 1)
  }

  const openStory = () => {
    if (hasStory) {
      const storyIndex = stories.findIndex(story => story.username === username)
      if (storyIndex !== -1) setSelectedStoryIndex(storyIndex)
    }
  }

  const closeStory = () => {
    setSelectedStoryIndex(null)
  }

  const handleUsernameClick = () => {
    localStorage.setItem('username', username);
    localStorage.setItem('profilePic', userImg);
}

  return (
    <div className="bg-white my-7 border rounded-sm">
      <div className="flex items-center p-5">
        <div
          className={`w-10 h-10 ${hasStory ? 'bg-gradient-to-tr from-lila to-burnt' : ''} rounded-full p-[2px] cursor-pointer`}
          onClick={openStory}
        >
          <img 
            src={userImg} 
            className="rounded-full w-full h-full object-cover border-2 border-white" 
            alt={username} 
          />
        </div>
        <a href={`/socials/user-profile`} className="flex-1 font-bold ml-3" onClick={handleUsernameClick}>
          {username}
        </a> 
        <button className="font-bold text-sm">•••</button>
      </div>

      <img src={img} className="object-cover w-full" alt="" />

      <div className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <button onClick={handleLike}>
              {isLiked ? (
                <HeartSolidIcon className="btn text-red-500" />
              ) : (
                <HeartIcon className="btn" />
              )}
            </button>
            <ChatBubbleOvalLeftIcon className="btn" />
            <PaperAirplaneIcon className="btn -rotate-45" />
          </div>
          <BookmarkIcon className="btn" />
        </div>

        <p className="font-bold mt-2">{likes} likes</p>
        <p className="truncate mt-2">
          <span className="font-bold mr-1">{username}</span> {caption}
        </p>

        <p className="text-sm text-gray-500 mt-2">View all 13 comments</p>

        <form className="flex items-center mt-3">
          <FaceSmileIcon className="h-7" />
          <input
            type="text"
            placeholder="Add a comment..."
            className="border-none flex-1 focus:ring-0 outline-none"
          />
          <button className="font-semibold text-blue-400">Post</button>
        </form>
      </div>

      {selectedStoryIndex !== null && (
        <StoryView
          stories={stories}
          initialStoryIndex={selectedStoryIndex}
          onClose={closeStory}
        />
      )}
    </div>
  )
}
