"use client"

import { Navigation } from "../../navigation"
import { Trends } from "../../trends"
import { useRouter } from "next/navigation"

export default function Bookmarks() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  return (
    <div className="container mx-auto flex min-h-screen">
      <Navigation onLogout={handleLogout} />
      <main className="w-1/2 border-r p-4">
        <h1 className="mb-4 text-xl font-bold">Bookmarks</h1>
        <p>Bookmarks content will go here.</p>
      </main>
      <Trends />
    </div>
  )
}