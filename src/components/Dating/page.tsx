import { useState } from 'react'
import Header from './components/header'
import SwipeArea from './components/swipeArea'
import ActionButtons from './components/actionButtons'
import MatchModal from './components/matchModal'
import ProfilePage from './components/profilePage'
import ChatList from './components/chatList'
import Chat from './components/chat'
import Navbar from '../Navbar/page'

type View = 'swipe' | 'profile' | 'chats' | 'chat'

interface User {
  id: string
  name: string
  age: number
  bio: string
  image: string
}

interface ChatPreview {
  id: string
  name: string
  lastMessage: string
  time: string
}

const initialUsers: User[] = [ 
  { id: '1', name: 'Alice', age: 28, bio: 'Adventure seeker and coffee lover', image: 'src/assets/prop-dating/prop-user1.png' }, 
  { id: '2', name: 'Bob', age: 32, bio: 'Foodie and travel enthusiast', image: 'src/assets/prop-dating/prop-user2.png' }, 
  { id: '3', name: 'Charlie', age: 25, bio: 'Musician and dog person', image: 'src/assets/prop-dating/prop-user3.png' }, 
  { id: '4', name: 'Diana', age: 30, bio: 'Yoga instructor and nature lover', image: 'src/assets/prop-dating/prop-user4.png' }, 
  { id: '5', name: 'Ethan', age: 27, bio: 'Tech geek and movie buff', image: 'src/assets/prop-dating/prop-user5.png' }, 
  { id: '6', name: 'Fiona', age: 29, bio: 'Bookworm and art lover', image: 'src/assets/prop-dating/prop-user1.png' }, 
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

export default function Dating() {
  const [showMatch, setShowMatch] = useState(false)
  const [currentView, setCurrentView] = useState<View>('swipe')
  const [currentChat, setCurrentChat] = useState<string | null>(null)
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [chats, setChats] = useState<ChatPreview[]>([])
  const [matchedUser, setMatchedUser] = useState<User | null>(null)
  const [matchedUserName, setMatchedUserName] = useState<string | null>(null);

  const handleSwipe = (direction: 'left' | 'right' | 'up') => {
    if (direction === 'right' && Math.random() < 0.2) {
      setMatchedUser(users[0])
      setShowMatch(true)
    }
    setUsers((prevUsers) => prevUsers.slice(1))
  }

  const handleSendMessage = () => {
    if (matchedUser) {
      const newChat: ChatPreview = {
        id: matchedUser.id,
        name: matchedUser.name, 
        lastMessage: "You matched with " + matchedUser.name,
        time: 'Just now'
      }
      setChats((prevChats) => [newChat, ...prevChats]);
      setCurrentChat(matchedUser.id);
      setMatchedUserName(matchedUser.name); 
      setCurrentView('chat');
      setShowMatch(false);
    }
  }

  const renderView = () => {
    switch (currentView) {
      case 'profile':
        return <ProfilePage onClose={() => setCurrentView('swipe')} />
      case 'chats':
        return <ChatList chats={chats} onChatSelect={(chatId) => {
          setCurrentChat(chatId)
          setCurrentView('chat')
        }} />
      case 'chat':
        return <Chat chatId={currentChat!} matchedUserName={matchedUserName} onClose={() => setCurrentView('chats')} />        
      default:
        return (
          <>
            <SwipeArea users={users} onSwipe={handleSwipe} />
            <ActionButtons onSwipe={handleSwipe} />
          </>
        )
    }
  }

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <Header
        onProfileClick={() => setCurrentView('profile')}
        onChatsClick={() => setCurrentView('chats')}
        onLogoClick={() => setCurrentView('swipe')}
      />
      <div className="flex-1 overflow-hidden flex flex-col items-center justify-center p-4">
        {renderView()}
      </div>
      {showMatch && matchedUser && (
        <MatchModal 
          onClose={() => setShowMatch(false)} 
          onSendMessage={handleSendMessage}
          matchedUser={{
            name: matchedUser.name,
            image: matchedUser.image
          }}
        />
      )}
    </div>
  )
}