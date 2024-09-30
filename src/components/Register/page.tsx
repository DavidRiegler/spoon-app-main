import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle registration logic here
    console.log('Registration attempt with:', { name, email, password })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E57E60]">
      <div className="bg-[#FCF7F8] p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-[#4E8098]">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#4E8098]">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-[#CED3DC] rounded-md text-sm shadow-sm placeholder-gray-400
                focus:outline-none focus:border-[#7C3B7C] focus:ring-1 focus:ring-[#7C3B7C]"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#4E8098]">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-[#CED3DC] rounded-md text-sm shadow-sm placeholder-gray-400
                focus:outline-none focus:border-[#7C3B7C] focus:ring-1 focus:ring-[#7C3B7C]"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#4E8098]">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-[#CED3DC] rounded-md text-sm shadow-sm placeholder-gray-400
                focus:outline-none focus:border-[#7C3B7C] focus:ring-1 focus:ring-[#7C3B7C]"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-[#7C3B7C] rounded hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[#7C3B7C] focus:ring-opacity-50"
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/" className="text-sm text-[#4E8098] hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}