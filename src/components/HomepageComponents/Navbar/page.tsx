import React, { useState } from 'react';
import { Home, Bell, Heart, FileText, Headphones, Menu, ShoppingCart, User, X } from 'lucide-react'; 

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  const menuItems = [
    { icon: Home, label: 'Home' },
    { icon: Bell, label: 'Notifications' },
    { icon: Heart, label: 'Favorites' },
    { icon: FileText, label: 'Orders' },
    { icon: Headphones, label: 'Support' },
  ]

  return (
    <nav className="bg-snow shadow-md">
      <div className="px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <button onClick={toggleMenu} className="text-lila focus:outline-none mr-6">
            <Menu size={32} />
          </button>
          <h1 className="text-2xl font-bold">Logo</h1>
        </div>
        <div className="flex items-center space-x-6">
          <button onClick={toggleCart} className="text-[#7C3B7C] focus:outline-none">
            <ShoppingCart size={32} />
          </button>
          <button onClick={toggleProfile} className="text-[#7C3B7C] focus:outline-none">
            <User size={32} />
          </button>
        </div>
      </div>

      {/* Hamburger Menu */}
      <nav
        className={`fixed inset-y-0 left-0 transform ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out z-20`}
      >
        <div className="p-6 bg-[#FCF7F8] h-full">
          <button onClick={toggleMenu} className="absolute top-4 right-4 text-[#4a3520] focus:outline-none">
            <X size={24} />
          </button>
          <ul className="space-y-4 mt-8">
            {menuItems.map(({ icon: Icon, label }) => (
              <li key={label}>
                <a href="#" className="flex items-center space-x-4 text-lg hover:text-[#7C3B7C]">
                  <Icon size={24}/>
                  <span>{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Shopping Cart Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 transform ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        } w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out z-30`}
      >
        <div className="p-6 bg-[#FCF7F8] h-full">
          <button onClick={toggleCart} className="absolute top-4 right-4 text-[#4a3520] focus:outline-none">
            <X size={24} />
          </button>
          <h2 className="text-xl font-bold mb-4">Your Cart</h2>
          {/* Add cart items here */}
          <p>Your cart is empty</p>
        </div>
      </div>

      {/* Profile Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 transform ${
          isProfileOpen ? 'translate-x-0' : 'translate-x-full'
        } w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out z-30`}
      >
        <div className="p-6 bg-[#FCF7F8] h-full">
          <button onClick={toggleProfile} className="absolute top-4 right-4 text-[#4a3520] focus:outline-none">
            <X size={24} />
          </button>
          <h2 className="text-xl font-bold mb-4">Your Profile</h2>
          {/* Add profile information here */}
          <p>Welcome, User!</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;