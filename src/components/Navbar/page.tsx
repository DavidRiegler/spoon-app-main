"use client"

import { useState, useEffect } from 'react'
import { Heart, ShoppingCart, User, Menu } from 'lucide-react'
import CartSidebar from './components/cart-sidebar'
import ProfileSidebar from './components/profile-sidebar'

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [cartItems, setCartItems] = useState<any[]>([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : ''

  const navItems = ['Homepage', 'Food', 'Dating', 'Game', 'Socials']

  return (
    <div className="flex flex-col bg-vanilla">
      <nav className="px-4 py-2">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <h1 className="text-2xl sm:text-4xl font-bold text-[#e57e60] mb-4 mt-4 text-center">Spoon It If You Like It</h1>
          <div className="w-full flex flex-col sm:flex-row justify-between items-center">
            <div className="relative flex-grow max-w-md mx-auto w-full sm:w-auto mb-4 sm:mb-0"> 
              <input
                type="text"
                placeholder="Search"
                className="w-full py-2 px-4 pr-10 rounded-full focus:outline-none focus:border-[#e57e60] text-burnt" 
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#e57e60] text-white rounded-full p-1" onClick={() => window.location.href = '/restaurant'}>
                🔍
              </button>
            </div>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <button className="text-burnt" onClick={() => window.location.href = '/favorites'}>
                <Heart className="h-10 w-10 bg-white p-2 rounded-lg" />
              </button>
              <button className="text-burnt" onClick={toggleCart}>
                <ShoppingCart className="h-10 w-10 bg-white p-2 rounded-lg" />
              </button>
              <button className="text-burnt" onClick={toggleProfile}>
                <User className="h-10 w-10 bg-white p-2 rounded-lg" />
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="bg-pink mt-2 rounded-t-xl">
        <div className="max-w-7xl mx-auto">
          <div className="sm:hidden">
            <button onClick={toggleMenu} className="w-full py-3 px-6 text-center font-bold text-xl text-vanilla flex items-center justify-center">
              <Menu className="mr-2" /> Menu
            </button>
          </div>
          <div className={`sm:flex justify-between ${isMenuOpen ? 'block' : 'hidden'}`}>
            {navItems.map((item) => {
              const path = `/${item.toLowerCase()}`
              const isActive = currentPath === path || (item === 'Homepage' && currentPath === '/')
              return (
                <a
                  key={item}
                  href={path}
                  className={`block sm:flex-1 py-3 px-6 text-center font-bold text-xl ${
                    isActive ? 'bg-white text-pink sm:rounded-t-xl' : 'text-vanilla'
                  }`}
                >
                  {item}
                </a>
              )
            })}
          </div>
        </div>
      </div>
      <CartSidebar isOpen={isCartOpen} onClose={toggleCart} cartItems={cartItems} setCartItems={setCartItems} />
      <ProfileSidebar isOpen={isProfileOpen} onClose={toggleProfile} />
    </div>
  )
}