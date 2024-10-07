'use client'

import React from 'react'
import { ArrowLeft } from 'lucide-react'

export default function OrderConfirmed() {
  const handleArrowClick = () => {
    localStorage.removeItem('cartItems'); 
    window.location.href = '/homepage'; 
  };

  return (
    <div className="bg-vanilla min-h-screen p-6 font-sans">
      <div className="max-w-2xl mx-auto bg-vanilla rounded-3xl p-6 relative">
        <div className="absolute top-6 left-6">
          <ArrowLeft className="text-lila w-6 h-6 hover:cursor-pointer" onClick={handleArrowClick} /> 
        </div>
        
        <div className="flex flex-col items-center justify-center mt-20">
          <div className="w-24 h-24 rounded-full border-4 border-lila flex items-center justify-center mb-6">
            <div className="w-4 h-4 bg-lila rounded-full"></div>
          </div>
          
          <h1 className="text-3xl font-bold text-lila mb-4">¡Order Confirmed!</h1>
          
          <p className="text-center text-black mb-6">
            Your order has<br />
            been placed<br />
            succesfully
          </p>
          
          <p className="text-center text-black mb-4">
            Delivery by Thu,<br />
            29th, 4:00 PM
          </p>
          
          <a href="#" className="text-lila underline mb-8">Track my order</a>
          
          <p className="text-center text-black text-sm">
            If you have any<br />
            questions, please reach<br />
            out directly to our<br />
            <a href="#" className="text-lila underline mb-8">customer support</a>
          </p>
        </div>
      </div>
    </div>
  )
}