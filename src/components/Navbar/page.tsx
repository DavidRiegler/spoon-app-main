"use client"

import { useState, useEffect } from 'react'
import { ShoppingCart, User, X, Search, CreditCard, Phone, HelpCircle, Settings, LogOut, Plus, Minus, Trash2 } from 'lucide-react'

export default function Component() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [cartItems, setCartItems] = useState<any[]>([])

  const toggleCart = () => setIsCartOpen(!isCartOpen)

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

  const updateQuantity = (id: number, change: number) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
    ).filter(item => item.quantity > 0)
    
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
    setCartItems(updatedCartItems)
  }

  const removeItem = (id: number) => {
    const updatedCartItems = cartItems.filter(item => item.id !== id)
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
    setCartItems(updatedCartItems)
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const taxAndFees = subtotal * 0.1 // Assuming 10% tax and fees
  const delivery = 5.99 // Fixed delivery fee
  const total = subtotal + taxAndFees + delivery

  const profileItems = [
    { icon: User, label: 'My Profile' },
    { icon: CreditCard, label: 'Payment Methods' },
    { icon: Phone, label: 'Contact Us' },
    { icon: HelpCircle, label: 'Help & FAQs' },
    { icon: Settings, label: 'Settings' },
  ]

  const tabs = [
    { name: 'Homepage', href: '/homepage' },
    { name: 'Socials', href: '/socials' },
    { name: 'Food', href: '/food' },
    { name: 'Dating', href: '/dating' },
    { name: 'Quiz', href: '/quiz' },
  ]

  const toggleProfile = () => setIsProfileOpen(!isProfileOpen)

  const userDataString = localStorage.getItem('userData');
  const user = userDataString ? JSON.parse(userDataString).user : { name: "", surname: "", email: "" };

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
      <div className="flex bg-snow px-2 -mr-1">
        {tabs.map((tab) => (
          <a
            key={tab.name}
            href={tab.href}
            className="relative px-4 py-2 text-xl font-bold text-snow bg-lila hover:bg-burnt rounded-t-lg mr-1 transition-colors duration-200 w-1/5 text-center"
          >
            {tab.name}
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-lila transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
          </a>
        ))}
      </div>
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out z-30 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 bg-[#FCF7F8] h-full flex flex-col">
          <button
            className="absolute top-4 right-4 text-lila"
            onClick={toggleCart}
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close cart</span>
          </button>
          <h2 className="text-xl font-bold mb-4 text-lila">Your Cart</h2>
          {cartItems.length === 0 ? (
            <p className="text-lila">Your cart is empty</p>
          ) : (
            <>
              <ul className="space-y-4 flex-grow overflow-auto">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lila">{item.name}</h3>
                      <p className="text-sm text-lila">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        className="h-6 w-6 rounded-full bg-snow text-lila flex items-center justify-center"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        <Minus className="h-4 w-4" />
                        <span className="sr-only">Decrease quantity</span>
                      </button>
                      <span className="text-lila">{item.quantity}</span>
                      <button
                        className="h-6 w-6 rounded-full bg-snow text-lila flex items-center justify-center"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <Plus className="h-4 w-4" />
                        <span className="sr-only">Increase quantity</span>
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove item</span>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6 space-y-2 border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lila">Subtotal:</span>
                  <span className="text-lila">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lila">Tax & Fees:</span>
                  <span className="text-lila">${taxAndFees.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lila">Delivery:</span>
                  <span className="text-lila">${delivery.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-lila">Total:</span>
                    <span className="font-bold text-lila">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <button className="w-full bg-lila text-white px-4 py-2 rounded-md mt-4">
                Checkout
              </button>
            </>
          )}
        </div>
      </div>
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-[#FCF7F8] shadow-lg transition-transform duration-300 ease-in-out z-30 ${
          isProfileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          <button
            className="absolute top-4 right-4 text-lila"
            onClick={toggleProfile}
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close profile</span>
          </button>
          <div className="flex items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-lila">{user.name || 'Guest'} {user.surname || ''}</h2>
              <p className="text-sm text-lila">{user.email || 'No email available'}</p>
            </div>
          </div>
          <ul className="space-y-4 flex-grow">
            {profileItems.map(({ icon: Icon, label }) => (
              <li key={label}>
                <a
                  className="flex items-center space-x-4 text-lg text-lila hover:text-lila"
                  href={`/${label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <Icon className="h-6 w-6" />
                  <span>{label}</span>
                </a>
              </li>
            ))}
          </ul>
          <a className="flex items-center space-x-4 text-lg text-lila mt-auto" href="/" onClick={() => { localStorage.clear(); }}>
            <LogOut className="h-6 w-6" />
            <span>Log Out</span>
          </a>
        </div>
      </div>
    </div>
  )
}