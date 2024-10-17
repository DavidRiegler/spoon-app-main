import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-burnt p-4">
      <div className="mb-8 w-full max-w-xs sm:max-w-sm md:max-w-md flex justify-center">
        <img
          src="src/assets/SpoonAppLogo.png"
          alt="SpoonApp Logo"
          className="w-60 h-auto object-contain"
        />
      </div>
      <div className="space-y-4 w-full max-w-xs sm:max-w-sm">
        <Link
          to="/login"
          className="block w-full px-6 py-3 text-center text-white bg-lila rounded-lg hover:bg-opacity-90 transition duration-300"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="block w-full px-6 py-3 text-center text-[#4E8098] bg-snow rounded-lg hover:bg-[#CED3DC] transition duration-300"
        >
          Register
        </Link>
      </div>
    </div>
  )
}