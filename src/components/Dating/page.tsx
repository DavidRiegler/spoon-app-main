import React from 'react'
import Navbar from '../Navbar/page'
import UserProfile from './components/user-profile'

export default function Dating() {

  return (
    <div className="bg-vanilla min-h-screen">
      <main className="mx-auto px-4 py-6 max-w-7xl">
        <Navbar />
        <div className='bg-pink rounded-b-xl'>
          <div className='bg-white pt-1 pb-1 rounded-t-xl'>
            <UserProfile />
          </div>
        </div>
      </main>
    </div>
  )
}