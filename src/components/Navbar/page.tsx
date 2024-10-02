"use client"

import { useState, useEffect } from 'react'
import { ShoppingCart, User, Search } from 'lucide-react'
import CartSidebar from './components/cart-sidebar'
import ProfileSidebar from './components/profile-sidebar'
import NavTabs from './components/nav-tabs'

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

  return (
    <div className="flex flex-col">
      <nav className="bg-snow shadow-md">
        <div className="px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="src/assets/SpoonAppLogo.png?height=40&width=40"
              alt="Logo"
              className="h-10 w-auto cursor-pointer"
              onClick={() => window.location.href = '/homepage'}
            />
          </div>
          <div className="w-1/3 mx-4">
            <div className="relative">
              <input
                className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4a3520]"
                placeholder="Search..."
                type="search"
              />
              <button
                className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 hover:text-lila">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <button className="text-lila" onClick={toggleCart}>
              <ShoppingCart className="h-6 w-6" />
              <span className="sr-only">Toggle cart</span>
            </button>
            <button className="text-lila" onClick={toggleProfile}>
              <User className="h-6 w-6" />
              <span className="sr-only">Toggle profile</span>
            </button>
          </div>
        </div>
      </nav>
      <NavTabs />
      <CartSidebar isOpen={isCartOpen} onClose={toggleCart} cartItems={cartItems} setCartItems={setCartItems} />
      <ProfileSidebar isOpen={isProfileOpen} onClose={toggleProfile} />
    </div>
  )
}