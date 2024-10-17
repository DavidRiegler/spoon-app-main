import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import SpoonAppLogo from '../../../assets/SpoonAppLogo.png'

export default function ForgotPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
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
      setPasswordError('Das Passwort muss mindestens 6 Zeichen lang sein.')
      setIsLoading(false)
      return;
    }
    if (!passwordRegex.test(password)) {
      setPasswordError('Das Passwort muss mindestens einen Großbuchstaben, einen Kleinbuchstaben, ein Sonderzeichen und eine Zahl enthalten.')
      setIsLoading(false)
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError('Die Passwörter stimmen nicht überein.')
      setIsLoading(false)
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:3000/api/auth/reset-password", { //todo
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password }),
      })

      if (response.ok) {
        window.location.href = '/login'
      } else {
        const errorData = await response.json()
        setErrorMessage(errorData.message || 'Passwortänderung fehlgeschlagen. Bitte versuchen Sie es erneut.')
      }
    } catch (error) {
      setErrorMessage('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-burnt p-4">
      <div className="bg-snow p-6 sm:p-10 rounded-lg shadow-md w-full max-w-4xl flex flex-col lg:flex-row">
        <div className="lg:w-1/2 lg:pr-8 mb-8 lg:mb-0">
          <div className='flex items-center mb-8'>
            <a href="/" className="flex items-center">
              <ChevronLeft className="w-6 h-6 text-lila" />
            </a>
          </div>
          {errorMessage && (
            <div className="mb-4 text-red-500">{errorMessage}</div>
          )}
          {passwordError && (
            <div className="mb-4 text-red-500">{passwordError}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-lila mb-1">
                New Password
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
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-lila mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              {isLoading ? 'Passwort wird geändert...' : 'Passwort ändern'}
            </button>
          </form>
          <div className="mt-4 text-center text-sm text-lila">
            Back to{' '}
            <Link to="/login" className="font-medium hover:underline">
              Login
            </Link>
          </div>
        </div>
        <div className="lg:w-1/2 rounded-lg flex items-center justify-center">
          <img src={SpoonAppLogo} alt="SpoonApp Logo" className="w-full h-auto max-w-xs lg:max-w-full" />
        </div>
      </div>
    </div>
  )
}