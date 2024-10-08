"use client"

import { useState, useEffect } from 'react'
import { ShoppingCart, User } from 'lucide-react'
import CartSidebar from './components/cart-sidebar'
import ProfileSidebar from './components/profile-sidebar'

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [cartItems, setCartItems] = useState<any[]>([])

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]')
    setCartItems(storedCartItems)

    const handleStorageChange = () => {
      const updatedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]')
      setCartItems(updatedCartItems)
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const toggleCart = () => setIsCartOpen(!isCartOpen)
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen)

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : ''

  return (
    <div className="flex flex-col bg-[#f9e9b0]">
      <nav className="px-4 py-2">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <h1 className="text-4xl font-bold text-[#e57e60] mb-4 mt-4">Spoon It If You Like It</h1>
          <div className="w-full flex justify-between items-center">
            <div className="relative flex-grow max-w-md mx-auto"> 
              <input
                type="text"
                placeholder="Search"
                className="w-full py-2 px-4 pr-10 rounded-full focus:outline-none focus:border-[#e57e60] text-burnt" 
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#e57e60] text-white rounded-full p-1" onClick={() => window.location.href = '/restaurant'}>
                🔍
              </button>
            </div>
            <div className="flex items-center space-x-4 -ml-24">
              <button className="text-burnt" onClick={toggleCart}>
                <ShoppingCart className="h-10 w-10 bg-white p-2 rounded-lg" />
                <span className="sr-only">Toggle cart</span>
              </button>
              <button className="text-burnt" onClick={toggleProfile}>
                <User className="h-10 w-10 bg-white p-2 rounded-lg" />
                <span className="sr-only">Toggle profile</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="bg-pink mt-2 rounded-t-xl">
        <div className="max-w-7xl mx-auto flex justify-between">
          {['Homepage', 'Food', 'Dating', 'Game', 'Socials'].map((item) => {
            const path = `/${item.toLowerCase()}`
            const isActive = currentPath === path || (item === 'Homepage' && currentPath === '/')
            return (
              <a
                key={item}
                href={path}
                className={`flex-1 py-3 px-6 text-center font-bold text-xl ${
                  isActive ? 'bg-white text-pink rounded-t-xl' : 'text-vanilla'
                }`}
              >
                {item}
              </a>
            )
          })}
        </div>
      </div>
      <CartSidebar isOpen={isCartOpen} onClose={toggleCart} cartItems={cartItems} setCartItems={setCartItems} />
      <ProfileSidebar isOpen={isProfileOpen} onClose={toggleProfile} />
    </div>
  )
}
