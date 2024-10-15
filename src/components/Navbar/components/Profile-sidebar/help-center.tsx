import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ChevronLeft } from 'react-feather'

export default function HelpCenterPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-vanilla flex flex-col items-center">
      <header className="w-full bg-vanilla p-4 flex items-center">
        <button className="text-lila" onClick={() => navigate(-1)}>
          <ChevronLeft />
        </button>
        <h1 className="text-2xl font-bold text-lila flex-grow text-center">Help Center</h1>
        <div className='w-6 h-6 bg-vanilla'></div>
      </header>
      <main className="flex-grow w-full max-w-md p-4 flex flex-col items-center space-y-4">
        <h2 className="text-xl font-semibold text-lila">How Can We Help You?</h2>
        <div className="w-full flex justify-between space-x-2">
          <button className="bg-lila text-white w-full py-2 rounded-full">FAQ</button>
          <button className="bg-pink text-white w-full py-2 rounded-full">Contact Us</button>
        </div>
        <div className="w-full flex justify-between space-x-2">
          <button className="bg-lila text-white w-full py-2 rounded-full">General</button>
          <button className="bg-pink text-white w-full py-2 rounded-full">Account</button>
          <button className="bg-pink text-white w-full py-2 rounded-full">Services</button>
        </div>
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2 rounded-lg border border-lila-light focus:outline-none focus:ring-2 focus:ring-lila"
        />
        <div className="w-full space-y-2">
          {[1, 2, 3].map((i) => (
            <details key={i} className="bg-white p-4 rounded-lg shadow-md">
              <summary className="font-semibold cursor-pointer text-lila">Lorem ipsum dolor sit amet?</summary>
              <p className="mt-2 text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem,
                vel tincidunt tortor placerat a. Proin ac diam quam. Aenean in sagittis magna, ut feugiat diam.
              </p>
            </details>
          ))}
        </div>
      </main>
    </div>
  )
}
