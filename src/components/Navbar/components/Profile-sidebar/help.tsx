import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ChevronLeft } from 'react-feather'

export default function HelpPage() {
    const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-vanilla flex flex-col items-center">
      <header className="w-full bg-vanilla p-4 flex items-center">
        <button className="text-lila" onClick={() => navigate(-1)}>
          <ChevronLeft />
        </button>
        <h1 className="text-2xl font-bold text-lila flex-grow text-center">Help</h1>
        <div className='w-6 h-6 bg-vanilla'></div>
      </header>
      <main className="flex-grow w-full max-w-md p-4 flex flex-col items-center justify-center space-y-4">
        <p className="text-center text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
          pellentesque congue lorem, vel tincidunt tortor.
        </p>
        <Link
          to="/support"
          className="w-full bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="font-semibold">Help with the order</h2>
          <p className="text-sm text-gray-600">Support</p>
        </Link>
        <Link
          to="/help-center"
          className="w-full bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="font-semibold">Help center</h2>
          <p className="text-sm text-gray-600">General information</p>
        </Link>
      </main>
    </div>
  )
}