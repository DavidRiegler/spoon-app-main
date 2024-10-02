import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import SpoonAppLogo from '../../assets/SpoonAppLogo.png'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)
    setErrorMessage('')

    const loginData = {
      email: email,
      password: password,
    }

    try {
      const response = await fetch("http://127.0.0.1:3000/api/auth/signup", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData),
      })

      if (response.ok) {
        const data = await response.json()
        const token = data.token
        localStorage.setItem('authtoken', token)

        const userResponse = await fetch(`http://127.0.0.1:3000/api/users/data/${email}`, {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          localStorage.setItem('userData', JSON.stringify(userData)); 
        }

        window.location.href = '/homepage'
      } else {
        const errorData = await response.json()
        setErrorMessage(errorData.message || 'Login failed. Please try again.')
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-burnt">
      <div className="bg-snow p-10 rounded-lg shadow-md w-[800px] flex">
        <div className="w-1/2 pr-8">
          <div className='flex items-center mb-8'>
            <a href="/" className="flex items-center">
              <ChevronLeft className="w-6 h-6 text-lila" />
            </a>
          </div>
          {errorMessage && (
            <div className="mb-4 text-red-500">{errorMessage}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-lila mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 bg-snow border border-lila rounded-md text-sm shadow-sm placeholder-gray-400
                  focus:outline-none focus:border-lila focus:ring-1 focus:ring-lila"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-lila mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 bg-snow border border-lila rounded-md text-sm shadow-sm placeholder-gray-400
                  focus:outline-none focus:border-lila focus:ring-1 focus:ring-lila"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-lila focus:ring-lila border-lila rounded accent-lila"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-lila">
                  Remember Me
                </label>
              </div>
              <div className="text-sm">
                <a href="/forgot-password" className="font-medium text-lila hover:underline">
                  Forgot Password?
                </a>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2 text-white bg-lila rounded hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-lila focus:ring-opacity-50 disabled:opacity-50"
            >
              {isLoading ? 'Logging in...' : 'Log in'}
            </button>
          </form>
          <div className="mt-4 text-center text-sm text-lila">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium hover:underline">
              Register
            </Link>
          </div>
        </div>
        <div className="w-1/2 rounded-lg flex items-center justify-center">
          <img src={SpoonAppLogo} alt="SpoonApp Logo" className="w-full h-auto" />
        </div>
      </div>
    </div>
  )
}