import React from 'react'
import { Search, ShoppingCart, User, Menu } from 'lucide-react'

interface NavbarProps {
  toggleMenu: () => void
  toggleCart: () => void
  toggleProfile: () => void
}

export default function Navbar({ toggleMenu, toggleCart, toggleProfile }: NavbarProps) {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#e67e51]">SpoonApp</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden sm:block relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 rounded-full bg-[#f5e7c1] focus:outline-none focus:ring-2 focus:ring-[#e67e51]"
            />
            <Search className="absolute left-3 top-2.5 text-[#e67e51]" size={20} />
          </div>
          <button onClick={toggleCart} className="text-[#e67e51] focus:outline-none">
            <ShoppingCart size={24} />
          </button>
          <button onClick={toggleProfile} className="text-[#e67e51] focus:outline-none">
            <User size={24} />
          </button>
          <button onClick={toggleMenu} className="text-[#e67e51] focus:outline-none">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  )
}