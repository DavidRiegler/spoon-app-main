import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronDown, Headphones, Globe, Phone, Facebook, Instagram } from 'react-feather';

const ContactOption = ({ icon, text }: { icon: React.ReactNode; text: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <button
        className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-lila-light"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className="flex items-center space-x-3">
          <span className="text-lila bg-lila bg-opacity-10 p-2 rounded-full">{icon}</span>
          <span className="text-lg font-medium text-gray-800">{text}</span>
        </div>
        <ChevronDown className={`text-lila transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="mt-2 p-4 bg-white rounded-xl shadow-inner border border-lila-light">
          <p className="text-gray-600">Content for {text}</p>
        </div>
      )}
    </div>
  );
};

export default function ContactUs() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-vanilla flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <header className="bg-lila p-4 flex items-center">
          <button 
            className="text-white hover:text-lila-light transition-colors" 
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl sm:text-2xl font-bold text-white flex-grow text-center">Contact Us</h1>
        </header>
        
        <main className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <h2 className="text-lg sm:text-xl font-semibold text-lila text-center">How Can We Help You?</h2>
          
          <div className="flex justify-center space-x-4">
            <button className="px-4 sm:px-6 py-2 bg-pink text-white rounded-full hover:bg-pink-dark transition-colors text-sm sm:text-base">
              FAQ
            </button>
            <button className="px-4 sm:px-6 py-2 bg-lila text-white rounded-full hover:bg-lila-dark transition-colors text-sm sm:text-base">
              Contact Us
            </button>
          </div>
          
          <div className="space-y-3 sm:space-y-4">
            <ContactOption icon={<Headphones size={20} />} text="Customer Service" />
            <ContactOption icon={<Globe size={20} />} text="Website Support" />
            <ContactOption icon={<Phone size={20} />} text="WhatsApp" />
            <ContactOption icon={<Facebook size={20} />} text="Facebook" />
            <ContactOption icon={<Instagram size={20} />} text="Instagram" />
          </div>

          <div className="text-center">
            <p className="text-gray-600 text-sm sm:text-base">
              Can't find what you're looking for?
            </p>
            <button 
              onClick={() => navigate('/help-&-faqs')} 
              className="mt-2 text-lila hover:text-pink transition-colors font-medium text-sm sm:text-base"
            >
              Visit our Help Center
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}