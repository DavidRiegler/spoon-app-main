import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!name || !surname || !username || !email || !password) {
      setErrorMessage('Please fill in all fields.')
      return
    }

    setIsLoading(true) // Set loading state

    try {
      const response = await fetch('http://127.0.0.1:3000/api/auth', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, surname, username, email, password }),
      })

      if (!response.ok) {
        throw new Error('Registration failed') // Handle API errors
      }

      const data = await response.json()
      console.log('Registration successful:', data) // Handle successful response (e.g., redirect)

      // Handle successful registration based on your backend API response
    } catch (error) {
      setErrorMessage('Registration failed. Please try again.') // Display error message
    } finally {
      setIsLoading(false) // Clear loading state
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E57E60]">
      <div className="bg-[#FCF7F8] p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-[#4E8098]">Register</h1>
        {errorMessage && (
          <div className="mb-4 text-red-500 text-center">{errorMessage}</div>
        )}
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
            <label htmlFor="surname" className="block text-sm font-medium text-[#4E8098]">
              Surname
            </label>
            <input
              type="text"
              id="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-[#CED3DC] rounded-md text-sm shadow-sm placeholder-gray-400
                focus:outline-none focus:border-[#7C3B7C] focus:ring-1 focus:ring-[#7C3B7C]"
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-[#4E8098]">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            disabled={isLoading}
            className="w-full px-4 py-2 text-white bg-[#7C3B7C] rounded hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[#7C3B7C] focus:ring-opacity-50 disabled:opacity-50"
          >
            {isLoading ? 'Registering...' : 'Register'}
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