import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import SpoonAppLogo from '../../assets/SpoonAppLogo.png'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [passwordError, setPasswordError] = useState('') 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage('')
    setPasswordError('') 

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])/;
    if (password.length < 6) { 
      setPasswordError('Password must be at least 6 characters long.')
      setIsLoading(false)
      return; 
    }
    if (!passwordRegex.test(password)) {
      setPasswordError('Password must contain at least one uppercase letter, one lowercase letter, one special character, and one number.')
      setIsLoading(false)
      return; 
    }

    try {
      const registerData = {
        name: name,
        surname: surname,
        username: username,
        email: email,
        password: password,
      }

      const response = await fetch("http://127.0.0.1:3000/api/auth", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerData),
      })

      if (response.ok) {
        const data = await response.json()
        const token = data.token
        localStorage.setItem('authtoken', token)
        window.location.href = '/on-boarding'
      } else {
        const errorData = await response.json()
        setErrorMessage(errorData.message || 'Registration failed. Please try again.')
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
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label htmlFor="name" className="block text-sm font-medium text-lila mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-snow border border-lila rounded-md text-sm shadow-sm placeholder-gray-400
                    focus:outline-none focus:border-lila focus:ring-1 focus:ring-lila"
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="surname" className="block text-sm font-medium text-lila mb-1">
                  Surname
                </label>
                <input
                  type="text"
                  id="surname"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-snow border border-lila rounded-md text-sm shadow-sm placeholder-gray-400
                    focus:outline-none focus:border-lila focus:ring-1 focus:ring-lila"
                />
              </div>
            </div>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-lila mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-3 py-2 bg-snow border border-lila rounded-md text-sm shadow-sm placeholder-gray-400
                  focus:outline-none focus:border-lila focus:ring-1 focus:ring-lila"
              />
            </div>
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
              {passwordError && ( 
                <div className="mt-1 text-red-500">{passwordError}</div>
              )}
            </div>
            <div>
              <label htmlFor="mobileNumber" className="block text-sm font-medium text-lila mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                id="mobileNumber"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
                className="w-full px-3 py-2 bg-snow border border-lila rounded-md text-sm shadow-sm placeholder-gray-400
                  focus:outline-none focus:border-lila focus:ring-1 focus:ring-lila"
              />
            </div>
            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-lila mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                required
                className="w-full px-3 py-2 bg-snow border border-lila rounded-md text-sm shadow-sm placeholder-gray-400
                  focus:outline-none focus:border-lila focus:ring-1 focus:ring-lila"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2 text-white bg-lila rounded hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-lila focus:ring-opacity-50 disabled:opacity-50"
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </form>
          <div className="mt-4 text-center text-sm text-lila">
            Already have an account?{' '}
            <Link to="/login" className="font-medium hover:underline">
              Log in
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