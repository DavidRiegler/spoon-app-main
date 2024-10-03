import { useState, useEffect } from 'react'
import { Grid, Settings, Film } from 'lucide-react'
import Navbar from '../../Navbar/page'
import Sidebar from './sidebar'

import prop2 from '../../../assets/prop-posts/prop2.png';

export default function Profile() {
  const [isFollowing, setIsFollowing] = useState(false)
  const [activeTab, setActiveTab] = useState('posts')
  const [username, setUsername] = useState('username'); 
  const [profilePic, setProfilePic] = useState('profilePic'); 

  const posts = [
    { id: 1, imageUrl: prop2 },
    { id: 2, imageUrl: prop2 },
    { id: 3, imageUrl: prop2 },
    { id: 4, imageUrl: prop2 },
    { id: 5, imageUrl: prop2 },
    { id: 6, imageUrl: prop2 },
    { id: 7, imageUrl: prop2 },
    { id: 8, imageUrl: prop2 },
    { id: 9, imageUrl: prop2 },
    { id: 10, imageUrl: prop2 },
    { id: 11, imageUrl: prop2 },
    { id: 12, imageUrl: prop2 },
    { id: 13, imageUrl: prop2 },
    { id: 14, imageUrl: prop2 },
    { id: 15, imageUrl: prop2 },
    { id: 16, imageUrl: prop2 },
    { id: 17, imageUrl: prop2 },
  ];

  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    const savedProfilePic = localStorage.getItem('profilePic');
    if (savedUsername) {
        setUsername(savedUsername);
    }
    if (savedProfilePic) {
        setProfilePic(savedProfilePic);
    }
    }, []);


  return (
    <div>
        <Navbar />
        <Sidebar />
        <div className="max-w-screen-md mx-auto p-4">
        <header className="flex flex-col md:flex-row items-center mb-8">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4 md:mb-0 md:mr-8">
            <img
                src={profilePic}
                alt="Profile picture"
                className="w-full h-full object-cover"
            />
            </div>
            <div className="flex-grow text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center mb-4">
                    <h1 className="text-2xl font-bold mr-4">{username}</h1>
                    <div className="flex space-x-2 mt-2 md:mt-0">
                    <button
                        className={`px-4 py-2 border ${isFollowing ? 'border-gray-300' : 'bg-blue-500 text-white'} rounded`}
                        onClick={() => setIsFollowing(!isFollowing)}
                    >
                        {isFollowing ? 'Following' : 'Follow'}
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded">
                        Message
                    </button>
                    <button className="p-2 border border-gray-300 rounded-full">
                        <Settings className="h-4 w-4" />
                        <span className="sr-only">Settings</span>
                    </button>
                    </div>
                </div>
                <div className="flex justify-center md:justify-start space-x-8 mb-4">
                    <span><strong>100</strong> posts</span>
                    <span><strong>1.5M</strong> followers</span>
                    <span><strong>500</strong> following</span>
                </div>
                <p className="font-semibold">Display Name</p>
                <p>Bio goes here. This is a brief description about the user.</p>
                <a href="#" className="text-blue-600">www.example.com</a>
                </div>
            </header>

            <div className="w-full">
                <div className="grid grid-cols-2 mb-4 border-b">
                <button
                    className={`py-2 w-full text-center ${activeTab === 'posts' ? 'border-b-2 border-black' : ''}`}
                    onClick={() => setActiveTab('posts')}
                >
                    <Grid className="h-4 w-4 inline-block mr-2" />
                    Posts
                </button>
                <button
                    className={`py-2 w-full text-center ${activeTab === 'reels' ? 'border-b-2 border-black' : ''}`}
                    onClick={() => setActiveTab('reels')}
                >
                    <Film className="h-4 w-4 inline-block mr-2" />
                    Reels
                </button>
                </div>

                <div className="mt-4">
                {activeTab === 'posts' && (
                    <div className="grid grid-cols-3 gap-1">
                    {posts.map((post) => (
                        <div key={post.id} className="aspect-square">
                        <img
                            src={post.imageUrl}
                            alt={`Post ${post.id}`}
                            className="w-full h-full object-cover"
                        />
                        </div>
                    ))}
                    </div>
                )}
                {activeTab === 'reels' && <p>Reels content goes here.</p>}
                {activeTab === 'saved' && <p>Saved content goes here.</p>}
                </div>
            </div>
        </div>
    </div>
  )
}
