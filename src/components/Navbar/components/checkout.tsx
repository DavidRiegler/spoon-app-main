'use client'

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Edit2, Minus, Plus, Trash2 } from 'lucide-react';

export default function OrderConfirmation() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [address, setAddress] = useState('778 Locust View Drive Oaklanda, CA'); 

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

  const updateQuantity = (uniqueId: string, change: number) => {
    const updatedCartItems = cartItems.map(item => {
      const itemUniqueId = `${item.id}-${item.toppings.map((t: { name: string }) => t.name).join('-')}`;
      return itemUniqueId === uniqueId 
        ? { ...item, quantity: Math.max(1, item.quantity + change) } 
        : item;
    });

    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const removeItem = (uniqueId: string) => {
    const updatedCartItems = cartItems.filter(item => {
      const itemUniqueId = `${item.id}-${item.toppings.map((t: { name: string }) => t.name).join('-')}`;
      return itemUniqueId !== uniqueId;
    });
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
  };

  const handleEditAddress = () => {
    setAddress(''); 
  };

  return (
    <div className="bg-vanilla min-h-screen p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <button className="text-pink" onClick={() => window.location.href = '/food'}>
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-3xl font-bold text-pink">Confirm Order</h1>
          <div className="w-6"></div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-pink mb-2">Shipping Address</h2>
          <div className="flex items-center justify-between bg-gray-100 rounded-lg p-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="text-pink bg-transparent border-none outline-none flex-1"
            />
            <button className="text-pink" onClick={handleEditAddress}>
              <Edit2 className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold text-pink">Order Summary</h2>
          </div>
          {cartItems.map((item) => {
            const uniqueId = `${item.id}-${item.toppings.map((t: { name: string }) => t.name).join('-')}`;
            return (
              <div key={uniqueId} className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg mr-4" />
                  <div>
                    <h3 className="font-semibold text-pink">{item.name}</h3>
                    {item.toppings.length > 0 && (
                      <div className="mt-1">
                        <p className="text-sm text-gray-600">Toppings:</p>
                        <ul className="list-disc list-inside text-sm text-gray-500 ml-2">
                          {item.toppings
                            .filter((t: { selected: boolean; name: string }) => t.selected)
                            .map((t: { name: string }, index: number) => (
                              <li key={index}>{t.name}</li>
                            ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                <button
                    className="text-red-500 hover:text-red-700 transition-colors"
                    onClick={() => removeItem(uniqueId)}
                    aria-label="Remove item"
                    >
                    <Trash2 className="h-5 w-5" />
                </button>
                  <div className="flex items-center mt-2">
                    <button
                      className="h-6 w-6 rounded-full bg-[#E9B7E9] text-pink flex items-center justify-center"
                      onClick={() => updateQuantity(uniqueId, -1)}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="mx-2 text-pink">{item.quantity}</span>
                    <button
                      className="h-6 w-6 rounded-full bg-[#E9B7E9] text-pink flex items-center justify-center"
                      onClick={() => updateQuantity(uniqueId, 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="font-semibold text-pink pt-2">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Tax and Fees:</span>
            <span className="font-semibold">${taxAndFees.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Delivery:</span>
            <span className="font-semibold">${delivery.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mt-4 border-t pt-4">
            <span className="text-lg font-semibold text-pink">Total:</span>
            <span className="text-lg font-semibold text-pink">${total.toFixed(2)}</span>
          </div>
        </div>
        <button className="w-full bg-[#E9B7E9] text-pink py-3 rounded-full mt-6 font-semibold transition-colors" onClick={() => window.location.href = '/payment'}>
          Place Order
        </button>
      </div>
    </div>
  );
}