import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    const loginData = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch("http://127.0.0.1:3000/api/auth/signup", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        localStorage.setItem('authtoken', token)
        window.location.href = '/homepage'
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-burnt">
      <div className="bg-snow p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-[#4E8098]">Login</h1>
        {errorMessage && (
          <div className="mb-4 text-red-500 text-center">{errorMessage}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
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
            className="w-full px-4 py-2 text-white bg-lila rounded hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-lila focus:ring-opacity-50 disabled:opacity-50"
          >
            {isLoading ? 'Logging in...' : 'Login'}
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