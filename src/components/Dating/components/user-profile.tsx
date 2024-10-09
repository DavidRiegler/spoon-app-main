import { useState } from 'react'
import { Heart, X, MessageCircle, Share2 } from 'lucide-react'

interface User {
    id: string
    name: string
    age: number
    bio: string
    image: string
}

const initialUsers: User[] = [ 
    { id: '1', name: 'Alice', age: 28, bio: 'Adventure seeker and coffee lover', image: 'src/assets/prop-dating/prop-user1.png' }, 
    { id: '2', name: 'Bob', age: 32, bio: 'Foodie and travel enthusiast', image: 'src/assets/prop-dating/prop-user2.png' }, 
    { id: '3', name: 'Charlie', age: 25, bio: 'Musician and dog person', image: 'src/assets/prop-dating/prop-user3.png' }, 
    { id: '4', name: 'Diana', age: 30, bio: 'Yoga instructor and nature lover', image: 'src/assets/prop-dating/prop-user4.png' }, 
    { id: '5', name: 'Ethan', age: 27, bio: 'Tech geek and movie buff', image: 'src/assets/prop-dating/prop-user5.png' }, 
    { id: '6', name: 'Fiona', age: 29, bio: 'Bookworm and art lover', image: 'src/assets/on-boarding/Pizza.jpg' }, 
    { id: '7', name: 'George', age: 31, bio: 'Sports enthusiast and fitness junkie', image: 'src/assets/prop-dating/prop-user2.png' }, 
    { id: '8', name: 'Hannah', age: 26, bio: 'Nature photographer and traveler', image: 'src/assets/prop-dating/prop-user3.png' }, 
    { id: '9', name: 'Ian', age: 34, bio: 'Musician and coffee addict', image: 'src/assets/prop-dating/prop-user4.png' }, 
    { id: '10', name: 'Julia', age: 22, bio: 'Aspiring chef and foodie', image: 'src/assets/prop-dating/prop-user5.png' }, 
    { id: '11', name: 'Kevin', age: 30, bio: 'Tech lover and gamer', image: 'src/assets/prop-dating/prop-user1.png' }, 
    { id: '12', name: 'Luna', age: 27, bio: 'Yoga teacher and meditation coach', image: 'src/assets/prop-dating/prop-user2.png' }, 
    { id: '13', name: 'Mike', age: 29, bio: 'Adventure seeker and travel blogger', image: 'src/assets/prop-dating/prop-user3.png' }, 
    { id: '14', name: 'Nora', age: 25, bio: 'Dog lover and runner', image: 'src/assets/prop-dating/prop-user4.png' }, 
    { id: '15', name: 'Oscar', age: 33, bio: 'Tech entrepreneur and investor', image: 'src/assets/prop-dating/prop-user5.png' }, 
    { id: '16', name: 'Paula', age: 28, bio: 'Writer and literature enthusiast', image: 'src/assets/prop-dating/prop-user1.png' }, 
    { id: '17', name: 'Quinn', age: 31, bio: 'Fitness trainer and health coach', image: 'src/assets/prop-dating/prop-user2.png' }, 
    { id: '18', name: 'Ryan', age: 26, bio: 'Music producer and sound engineer', image: 'src/assets/prop-dating/prop-user3.png' }, 
    { id: '19', name: 'Sophia', age: 24, bio: 'Fashion designer and style guru', image: 'src/assets/prop-dating/prop-user4.png' }, 
    { id: '20', name: 'Tom', age: 29, bio: 'Photographer and videographer', image: 'src/assets/prop-dating/prop-user5.png' }, 
  ]

export default function UserProfile() {
    const [currentUserIndex, setCurrentUserIndex] = useState(0)
    const [favoriteDishes] = useState(['Pizza', 'Pasta', 'Sushi'])
    const [showPopup, setShowPopup] = useState<'like' | 'dislike' | null>(null)
  
    const currentUser = initialUsers[currentUserIndex]
  
    const handleAction = (action: 'like' | 'dislike') => {
      setShowPopup(action)
  
      setTimeout(() => {
        setShowPopup(null)
        
        if (currentUserIndex < initialUsers.length - 1) {
          setCurrentUserIndex(currentUserIndex + 1)
        } else {
          setCurrentUserIndex(0) 
        }
      }, 500) 
    }
  
    return (
      <div className="bg-white rounded-xl overflow-hidden relative">
        {showPopup && (
          <div className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 transition-opacity duration-300 ${showPopup ? 'opacity-100' : 'opacity-0'}`}>
            <div className="text-white text-4xl font-bold">
              {showPopup === 'like' ? 'Liked!' : 'Disliked!'}
            </div>
          </div>
        )}
  
        <div className="relative">
          <img src={currentUser.image} alt={currentUser.name} className="w-full h-96 object-contain rounded-tr-xl" />
        </div>
        <div className="left-0 right-0 bg-pink flex justify-between p-4 text-white rounded-b-3xl">
            <h2 className="text-2xl font-bold">{currentUser.name}, {currentUser.age}</h2>
            <p className="text-2xl">{currentUser.bio}</p>
        </div>
        
        <div className="p-4 bg-white grid grid-cols-2 gap-4">
            <div className='border-4 border-vanilla rounded-custom justify-center flex'>
                <div className="flex space-x-4 mb-4">
                    {favoriteDishes.map((dish, index) => (
                        <div key={index} className="text-center">
                            <div className="w-32 h-16 rounded-full overflow-hidden flex items-center justify-center mb-1 mt-4">
                                <img src={`src/assets/prop-food/${dish.toLowerCase()}.jpg`} alt={dish} className="w-full h-full object-cover" />
                            </div>
                            <span className="text-sm">{dish}</span>
                        </div>
                    ))}
                </div>
            </div>
          
          <div className="flex flex-row space-x-8 items-center justify-center space-y-2">
            <button
              className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center shadow-md"
              onClick={() => handleAction('dislike')}
            >
              <X className="text-white" size={24} />
            </button>
            <button className="w-14 h-14 bg-pink rounded-full flex items-center justify-center shadow-md">
              <MessageCircle className="text-white" size={24} />
            </button>
            <button className="w-14 h-14 bg-pink rounded-full flex items-center justify-center shadow-md">
              <Share2 className="text-white" size={24} />
            </button>
            <button
              className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-md"
              onClick={() => handleAction('like')}
            >
              <Heart className="text-white" size={24} />
            </button>
          </div>
        </div>
      </div>
    )
  }