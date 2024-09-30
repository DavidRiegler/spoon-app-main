import Image from 'next/image'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#E57E60]">
      <div className="mb-8">
        <Image
          src="/placeholder.svg?height=100&width=200"
          alt="Logo"
          width={200}
          height={100}
          className="rounded-lg"
        />
      </div>
      <div className="space-y-4">
        <Link
          href="/login"
          className="block w-64 px-6 py-3 text-center text-white bg-[#7C3B7C] rounded-lg hover:bg-opacity-90 transition duration-300"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="block w-64 px-6 py-3 text-center text-[#4E8098] bg-[#FCF7F8] rounded-lg hover:bg-[#CED3DC] transition duration-300"
        >
          Register
        </Link>
      </div>
    </div>
  )
}