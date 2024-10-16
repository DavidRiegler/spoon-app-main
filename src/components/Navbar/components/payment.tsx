'use client'

import React, { useState, useEffect } from 'react'
import { ArrowLeft, CreditCard } from 'lucide-react'

export default function Payment() {
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [address] = useState('778 Locust View Drive Oaklanda, CA'); 
  
    useEffect(() => {
      const storedCartItems = localStorage.getItem('cartItems');
      if (storedCartItems) {
        setCartItems(JSON.parse(storedCartItems));
      }
    }, []);
  
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const taxAndFees = subtotal * 0.1; // Assuming 10% tax and fees
    const delivery = 5.99; // Fixed delivery fee
    const total = subtotal + taxAndFees + delivery;

  return (
    <div className="bg-vanilla min-h-screen p-5">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <ArrowLeft className="text-pink hover:cursor-pointer" size={24} onClick={() => window.location.href = '/checkout'}/>
          <h1 className="text-lila text-2xl font-bold">Payment</h1>
          <div className="flex gap-3">
          </div>
        </div>

        <div className="mb-6 border-t-2 pt-4">
          <h2 className="text-lila font-semibold text-xl mb-3">Shipping Address</h2>
          <div className="bg-gray-100 p-3 rounded-lg flex justify-between items-center">
            <span>{address}</span>
          </div>
        </div>

        <div className="mb-6 border-t-2 pt-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lila font-semibold text-xl">Order Summary</h2>
          </div>
          {cartItems.map((item) => {
            const uniqueId = `${item.id}-${item.toppings.map((t: { name: string }) => t.name).join('-')}`;
            return (
              <div key={uniqueId} className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div>
                    <h3 className="font-semibold text-pink">{item.name}</h3>
                    <span className="mx-2 text-black">Item quantity: {item.quantity}</span>
                  </div>
                </div>
              </div>
            );
          })}
        <div className="flex justify-between my-4 border-t pt-4">
            <span className="text-lg text-lila font-semibold">Total:</span>
            <span className="text-lg text-lila font-semibold">${total.toFixed(2)}</span>
        </div>

        <div className="mb-6 border-t-2 pt-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lila font-semibold text-xl">Payment Method</h2>
            <button className="bg-[#E9B7E9] rounded px-3 py-1 text-pink" onClick={() => window.location.href = '/payment-methods'}>
              Edit
            </button>
          </div>
          <div className="flex items-center gap-3">
            <CreditCard className="text-[#D8A7D8]" size={24} />
            <span>Credit Card</span>
            <span className="ml-auto bg-gray-100 p-1 rounded">
              *** *** *** 43 /00 /000
            </span>
          </div>
        </div>

        <div className="mb-6 border-t-2 pt-4">
          <h2 className="text-lila font-semibold text-xl mb-3">Delivery Time</h2>
          <div className="flex justify-between">
            <span>Estimated Delivery</span>
            <span>25 mins</span>
          </div>
        </div>

        <button className="w-full bg-[#E9B7E9] border-none rounded-full py-4 text-pink text-lg font-bold">
          Pay Now
        </button>
      </div>
    </div>
    </div>
  )
}