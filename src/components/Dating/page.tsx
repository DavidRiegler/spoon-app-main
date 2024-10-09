import React from 'react'
import Navbar from '../Navbar/page'
import UserProfile from './components/user-profile'

export default function Dating() {

  return (
    <div className="bg-vanilla min-h-screen">
      <main className="mx-auto px-4 py-6 w-2/3">
        <Navbar />
        <div className='bg-pink-200 rounded-b-xl'>
          <div className='bg-white pt-1 pb-1 rounded-tr-xl rounded-b-xl'>
            <UserProfile />
          </div>
        </div>
      </main>
    </div>
  )
}