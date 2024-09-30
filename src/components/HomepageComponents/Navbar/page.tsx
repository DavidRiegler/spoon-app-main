import { useState } from 'react'
import { Home, Bell, Heart, FileText, Menu, ShoppingCart, User, X, Search, CreditCard, Phone, HelpCircle, Settings, LogOut, Plus, Minus, Trash2 } from 'lucide-react'

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Product 1', price: 19.99, quantity: 1 },
    { id: 2, name: 'Product 2', price: 29.99, quantity: 2 },
  ])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleCart = () => setIsCartOpen(!isCartOpen)
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen)

  const menuItems = [
    { icon: Home, label: 'Homepage' },
    { icon: Bell, label: 'Notifications' },
    { icon: Heart, label: 'Favorites' },
    { icon: FileText, label: 'Orders' },
  ]

  const profileItems = [
    { icon: User, label: 'My Profile' },
    { icon: CreditCard, label: 'Payment Methods' },
    { icon: Phone, label: 'Contact Us' },
    { icon: HelpCircle, label: 'Help & FAQs' },
    { icon: Settings, label: 'Settings' },
  ]

  const updateQuantity = (id: number, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
      ).filter(item => item.quantity > 0)
    )
  }

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const taxAndFees = subtotal * 0.1 // Assuming 10% tax and fees
  const delivery = 5.99 // Fixed delivery fee
  const total = subtotal + taxAndFees + delivery

  return (
    <nav className="bg-snow shadow-md">
      <div className="px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <button className="mr-6 text-lila" onClick={toggleMenu}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </button>
          <img
            src="src/assets/SpoonAppLogo.png"
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
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out z-20 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 bg-[#FCF7F8] h-full">
          <button
            className="absolute top-4 right-4 text-lila"
            onClick={toggleMenu}
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close menu</span>
          </button>
          <ul className="space-y-4 mt-8">
            {menuItems.map(({ icon: Icon, label }) => (
              <li key={label}>
                <a
                  className="text-lila flex items-center space-x-4 text-lg"
                  href={`/${label.toLowerCase()}`}
                >
                  <Icon className="h-6 w-6" />
                  <span>{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
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
              <h2 className="text-xl font-bold text-lila">John Smith</h2>
              <p className="text-sm text-lila">Loremipsum@email.com</p>
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
          <a className="flex items-center space-x-4 text-lg text-lila mt-auto" href="/">
            <LogOut className="h-6 w-6" />
            <span>Log Out</span>
          </a>
        </div>
      </div>
    </nav>
  )
}