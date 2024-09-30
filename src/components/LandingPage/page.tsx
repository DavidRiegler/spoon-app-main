import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-burnt">
      <div className="mb-8">
        <img
          src="src/assets/SpoonAppLogo.png"
          alt="SpoonApp Logo"
          className="w-48 h-auto object-contain"
        />
      </div>
      <div className="space-y-4">
        <Link
          to="/login"
          className="block w-64 px-6 py-3 text-center text-white bg-lila rounded-lg hover:bg-opacity-90 transition duration-300"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="block w-64 px-6 py-3 text-center text-[#4E8098] bg-snow rounded-lg hover:bg-[#CED3DC] transition duration-300"
        >
          Register
        </Link>
      </div>
    </div>
  )
}