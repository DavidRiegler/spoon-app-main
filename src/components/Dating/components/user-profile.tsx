'use client'

import { useState, useEffect } from 'react'
import { Wine, WineOff, MessageCircle, Settings } from 'lucide-react'
import SettingsPage from './settings'

interface User {
  id: string
  name: string
  age: number
  bio: string
  image: string
  favoriteDishes: string[]
}

const initialUsers: User[] = [ 
  { id: '1', name: 'Alice', age: 28, bio: 'Adventure seeker and coffee lover', image: 'src/assets/prop-dating/prop-user1.png', favoriteDishes: ['Pizza', 'Sushi', 'Tacos', 'Ice Cream', 'Salad'] }, 
  { id: '2', name: 'Bob', age: 32, bio: 'Foodie and travel enthusiast', image: 'src/assets/prop-dating/prop-user2.png', favoriteDishes: ['Burger', 'Sushi', 'Steak', 'Pizza', 'Pasta'] }, 
  { id: '3', name: 'Charlie', age: 25, bio: 'Musician and dog person', image: 'src/assets/prop-dating/prop-user3.png', favoriteDishes: ['Pasta', 'Pizza', 'Salad', 'Soup', 'Fish'] }, 
  { id: '4', name: 'Diana', age: 30, bio: 'Yoga instructor and nature lover', image: 'src/assets/prop-dating/prop-user4.png', favoriteDishes: ['Pizza', 'Burger', 'Fruit', 'Cake', 'Salad'] }, 
  { id: '5', name: 'Ethan', age: 27, bio: 'Tech geek and movie buff', image: 'src/assets/prop-dating/prop-user5.png', favoriteDishes: ['Pizza', 'Sushi', 'Tacos', 'Chocolate', 'Steak'] }, 
  { id: '6', name: 'Fiona', age: 29, bio: 'Bookworm and art lover', image: 'src/assets/on-boarding/Pizza.jpg', favoriteDishes: ['Sushi', 'Pasta', 'Salad', 'Chocolate', 'Ice Cream'] }, 
  { id: '7', name: 'George', age: 31, bio: 'Sports enthusiast and fitness junkie', image: 'src/assets/prop-dating/prop-user2.png', favoriteDishes: ['Pasta', 'Pizza', 'Chicken', 'Fish', 'Rice'] }, 
  { id: '8', name: 'Hannah', age: 26, bio: 'Nature photographer and traveler', image: 'src/assets/prop-dating/prop-user3.png', favoriteDishes: ['Berries', 'Pizza', 'Sushi', 'Pasta', 'Cake'] }, 
  { id: '9', name: 'Ian', age: 34, bio: 'Musician and coffee addict', image: 'src/assets/prop-dating/prop-user4.png', favoriteDishes: ['Pizza', 'Tacos', 'Sushi', 'Burger', 'Salad'] }, 
  { id: '10', name: 'Julia', age: 22, bio: 'Aspiring chef and foodie', image: 'src/assets/prop-dating/prop-user5.png', favoriteDishes: ['Sushi', 'Pasta', 'Pizza', 'Ice Cream', 'Salad'] }, 
  { id: '11', name: 'Kevin', age: 30, bio: 'Tech lover and gamer', image: 'src/assets/prop-dating/prop-user1.png', favoriteDishes: ['Burger', 'Pizza', 'Tacos', 'Pasta', 'Steak'] }, 
  { id: '12', name: 'Luna', age: 27, bio: 'Yoga teacher and meditation coach', image: 'src/assets/prop-dating/prop-user2.png', favoriteDishes: ['Pizza', 'Sushi', 'Cake', 'Fruit', 'Ice Cream'] }, 
  { id: '13', name: 'Mike', age: 29, bio: 'Adventure seeker and travel blogger', image: 'src/assets/prop-dating/prop-user3.png', favoriteDishes: ['Pasta', 'Sushi', 'Pizza', 'Burger', 'Chocolate'] }, 
  { id: '14', name: 'Nora', age: 25, bio: 'Dog lover and runner', image: 'src/assets/prop-dating/prop-user4.png', favoriteDishes: ['Pizza', 'Sushi', 'Salad', 'Fruit', 'Cake'] }, 
  { id: '15', name: 'Oscar', age: 33, bio: 'Tech entrepreneur and investor', image: 'src/assets/prop-dating/prop-user5.png', favoriteDishes: ['Burger', 'Tacos', 'Pizza', 'Sushi', 'Ice Cream'] }, 
  { id: '16', name: 'Paula', age: 28, bio: 'Writer and literature enthusiast', image: 'src/assets/prop-dating/prop-user1.png', favoriteDishes: ['Pasta', 'Pizza', 'Salad', 'Tacos', 'Fish'] }, 
  { id: '17', name: 'Quinn', age: 31, bio: 'Fitness trainer and health coach', image: 'src/assets/prop-dating/prop-user2.png', favoriteDishes: ['Pizza', 'Sushi', 'Salad', 'Fruit', 'Chicken'] }, 
  { id: '18', name: 'Ryan', age: 26, bio: 'Music producer and sound engineer', image: 'src/assets/prop-dating/prop-user3.png', favoriteDishes: ['Burger', 'Pizza', 'Sushi', 'Ice Cream', 'Cake'] }, 
  { id: '19', name: 'Sophia', age: 24, bio: 'Fashion designer and style guru', image: 'src/assets/prop-dating/prop-user4.png', favoriteDishes: ['Sushi', 'Pasta', 'Pizza', 'Burger', 'Fruit'] }, 
  { id: '20', name: 'Tom', age: 29, bio: 'Photographer and videographer', image: 'src/assets/prop-dating/prop-user5.png', favoriteDishes: ['Pizza', 'Burger', 'Cake', 'Chocolate', 'Salad'] }, 
]

const favoriteDishes = ['Pizza', 'Burger', 'Sushi', 'Pasta', 'BerryCupcake'];

export default function UserProfile() {
  const [currentUserIndex] = useState(0)
  const [showPopup, setShowPopup] = useState<'like' | 'dislike' | 'match' | null>(null)
  const [matches, setMatches] = useState<User[]>([])
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const [validUserIndex, setValidUserIndex] = useState(currentUserIndex);
  
  const currentUser = initialUsers[validUserIndex];

  useEffect(() => {
    const storedMatches = localStorage.getItem('matches')
    if (storedMatches) {
      setMatches(JSON.parse(storedMatches))
    }

    if (countMatchingDishes(initialUsers[validUserIndex].favoriteDishes) < 3) {
      const nextValidUserIndex = getNextUserWithMatchingDishes(validUserIndex);
      setValidUserIndex(nextValidUserIndex);
    }
  }, [])

  const getFirstThreeMatchingDishes = (userDishes: string[]) => {
    return userDishes.filter(dish => favoriteDishes.includes(dish)).slice(0, 3);
  }

  const countMatchingDishes = (userDishes: string[]) => {
    return userDishes.filter(dish => favoriteDishes.includes(dish)).length;
  }

  const handleAction = (action: 'like' | 'dislike') => {
    setShowPopup(action);
    
    if (action === 'like') {
      const isMatch = Math.random() < 1;
      if (isMatch) {
        const updatedMatches = [...matches, currentUser];
        setMatches(updatedMatches);
        localStorage.setItem('matches', JSON.stringify(updatedMatches));
        localStorage.setItem(`match_${currentUser.id}`, JSON.stringify(currentUser));
        setShowPopup('match');
      }
    }

    setTimeout(() => {
      setShowPopup(null);
      const nextIndex = validUserIndex < initialUsers.length - 1 ? validUserIndex + 1 : 0;
      const nextValidUserIndex = getNextUserWithMatchingDishes(nextIndex);
      setValidUserIndex(nextValidUserIndex);
    }, 500);
  }  
  
  const getNextUserWithMatchingDishes = (startIndex: number): number => {
    let index = startIndex;
    while (countMatchingDishes(initialUsers[index].favoriteDishes) < 3) {
      index++;
      if (index >= initialUsers.length) {
        index = 0;
      }
      if (index === startIndex) return startIndex; 
    }
    return index;
  }
  
  const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen)

  return (
    <div>
      {showPopup && (
        <div 
          className={`popup fixed inset-0 flex z-30 items-center justify-center transition-transform duration-500 ${showPopup === 'like' ? 'bg-green-100 animate-like' : showPopup === 'dislike' ? 'bg-red-100 animate-dislike' : 'bg-purple-100 animate-match'}`}
        >
          <div className="text-center p-8 bg-white rounded-lg shadow-lg">
            <div className="message text-3xl font-bold">
              {showPopup === 'like' && 'You liked this user!'}
              {showPopup === 'dislike' && 'You disliked this user!'}
              {showPopup === 'match' && 'It\'s a match!'}
            </div>
          </div>
        </div>
      )}


      <div className="relative">
        <div className='right-2 absolute top-2 bg-white p-2 rounded-full'>
          <button onClick={() => window.location.href = '/dating/chats'}>
            <MessageCircle size={36} />
          </button>
        </div>
        <div className='left-2 absolute top-2 bg-white p-2 rounded-full'>
          <button onClick={toggleSettings}>
            <Settings size={36} />
          </button>
        </div>
        <img src={currentUser.image} alt={currentUser.name} className="w-full h-96 object-contain" />
      </div>
      <div className="left-0 right-0 bg-pink flex justify-between p-4 text-white rounded-b-3xl">
        <h2 className="text-2xl font-bold">{currentUser.name}, {currentUser.age}</h2>
        <p className="text-lg">{currentUser.bio}</p>
      </div>

      <div className="p-4 bg-white grid grid-cols-2 gap-4">
        <div className='border-4 border-vanilla rounded-lg justify-center flex'>
          <div className="flex space-x-4 mb-4">
            {getFirstThreeMatchingDishes(currentUser.favoriteDishes).map((dish, index) => (
              <div key={index} className="text-center">
                <div className="w-40 h-24 rounded-full overflow-hidden flex items-center justify-center mb-1 mt-4">
                  <img src={`src/assets/prop-food/${dish}.jpg`} alt={dish} className="w-full h-full object-cover" />
                </div>
                <span className="text-lg font-semibold text-burnt">{dish}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-row space-x-8 items-center justify-center">
          <button
            className="w-28 h-28 bg-red-500 rounded-full flex items-center justify-center shadow-md"
            onClick={() => handleAction('dislike')}
          >
            <WineOff className="text-white" size={64} />
          </button>
          <button
            className="w-28 h-28 bg-green-500 rounded-full flex items-center justify-center shadow-md"
            onClick={() => handleAction('like')}
          >
            <Wine className="text-white" size={64} />
          </button>
        </div>
      </div>
      <SettingsPage isOpen={isSettingsOpen} onClose={toggleSettings} />
    </div>
  )
}
