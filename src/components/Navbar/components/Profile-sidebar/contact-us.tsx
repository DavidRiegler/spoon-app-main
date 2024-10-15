import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronDown, Headphones, Globe, Phone, Facebook, Instagram } from 'react-feather';

const ContactOption = ({ icon, text }: { icon: React.ReactNode; text: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <button
        className="w-full flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <span className="text-lila mr-3">{icon}</span>
          <span className="text-black">{text}</span>
        </div>
        <ChevronDown className={`text-lila transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="mt-2 p-3 bg-gray-100 rounded-lg">
          <p>Content for {text}</p>
        </div>
      )}
    </div>
  );
};

export default function ContactUs() {
    const navigate = useNavigate()

  return (
    <div className="min-h-screen flex justify-center items-center bg-vanilla">
      <div className="max-w-md w-full bg-white rounded-lg overflow-hidden">
        <header className="bg-vanilla p-4 flex items-center">
          <button className="text-lila" onClick={() => navigate(-1)}>
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-lila flex-grow text-center">Contact Us</h1>
        </header>
        
        <main className="p-6">
          <h2 className="text-xl text-lila text-center mb-6">How Can We Help You?</h2>
          
          <div className="flex justify-center space-x-4 mb-8">
            <button className="px-6 py-2 bg-pink text-white rounded-full">
              FAQ
            </button>
            <button className="px-6 py-2 bg-pink text-white rounded-full">
              Contact Us
            </button>
          </div>
          
          <div className="space-y-4">
            <ContactOption icon={<Headphones size={20} />} text="Customer service" />
            <ContactOption icon={<Globe size={20} />} text="Website" />
            <ContactOption icon={<Phone size={20} />} text="Whatsapp" />
            <ContactOption icon={<Facebook size={20} />} text="Facebook" />
            <ContactOption icon={<Instagram size={20} />} text="Instagram" />
          </div>
        </main>
      </div>
    </div>
  );
}
