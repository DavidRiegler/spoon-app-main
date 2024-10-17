'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Edit2, Minus, Plus, Trash2 } from 'lucide-react';

export default function OrderConfirmation() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [address, setAddress] = useState<string>(''); 

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }

    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      if (parsedUserData.user && parsedUserData.user.selectedAddress) {
        setAddress(parsedUserData.user.selectedAddress.address);
      }
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

  return (
    <div className="bg-vanilla min-h-screen p-4 sm:p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <button className="text-lila" onClick={() => window.location.href = '/food'}>
            <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-lila">Confirm Order</h1>
          <div className="w-5 sm:w-6"></div>
        </div>

        <div className="mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-lila mb-2">Shipping Address</h2>
          <div className="flex items-center justify-between bg-gray-100 rounded-lg p-2 sm:p-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="text-lila bg-transparent border-none outline-none flex-1 text-sm sm:text-base"
            />
            <button className="text-lila" onClick={() => window.location.href = '/address-manager'}>
              <Edit2 className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>

        <div className="mb-4 sm:mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg sm:text-xl font-semibold text-lila">Order Summary</h2>
          </div>
          {cartItems.map((item) => {
            const uniqueId = `${item.id}-${item.toppings.map((t: { name: string }) => t.name).join('-')}`;
            return (
              <div key={uniqueId} className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center">
                  <img src={item.image} alt={item.name} className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg mr-3 sm:mr-4" />
                  <div>
                    <h3 className="font-semibold text-lila text-sm sm:text-base">{item.name}</h3>
                    {item.toppings.length > 0 && (
                      <div className="mt-1">
                        <p className="text-xs sm:text-sm text-gray-600">Toppings:</p>
                        <ul className="list-disc list-inside text-xs sm:text-sm text-gray-500 ml-2">
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
                    <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                  <div className="flex items-center mt-2">
                    <button
                      className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-[#E9B7E9] text-pink flex items-center justify-center"
                      onClick={() => updateQuantity(uniqueId, -1)}
                    >
                      <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                    </button>
                    <span className="mx-2 text-lila text-sm sm:text-base">{item.quantity}</span>
                    <button
                      className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-[#E9B7E9] text-pink flex items-center justify-center"
                      onClick={() => updateQuantity(uniqueId, 1)}
                    >
                      <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                    </button>
                  </div>
                  <p className="font-semibold text-lila pt-2 text-sm sm:text-base">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="border-t border-gray-200 pt-3 sm:pt-4">
          <div className="flex justify-between mb-2 text-sm sm:text-base">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2 text-sm sm:text-base">
            <span className="text-gray-600">Tax and Fees:</span>
            <span className="font-semibold">${taxAndFees.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2 text-sm sm:text-base">
            <span className="text-gray-600">Delivery:</span>
            <span className="font-semibold">${delivery.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mt-3 sm:mt-4 border-t pt-3 sm:pt-4">
            <span className="text-base sm:text-lg font-semibold text-lila">Total:</span>
            <span className="text-base sm:text-lg font-semibold text-lila">${total.toFixed(2)}</span>
          </div>
        </div>
        
        <button className="w-full bg-lila text-white py-2 sm:py-3 rounded-full mt-4 sm:mt-6 font-semibold transition-colors text-sm sm:text-base" onClick={() => window.location.href = '/payment'}>
          Place Order
        </button>
      </div>
    </div>
  );
}