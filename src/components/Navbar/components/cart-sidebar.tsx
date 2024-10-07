import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: any[];
  setCartItems: (items: any[]) => void;
}

export default function CartSidebar({ isOpen, onClose, cartItems, setCartItems }: CartSidebarProps) {
  const updateQuantity = (uniqueId: string, change: number) => {
    const updatedCartItems = cartItems.map(item => {
      const itemUniqueId = `${item.id}-${item.toppings.map((t: { name: string }) => t.name).join('-')}`;
      return itemUniqueId === uniqueId 
        ? { ...item, quantity: Math.max(0, item.quantity + change) } 
        : item;
    }).filter(item => item.quantity > 0);

    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
  };

  const removeItem = (uniqueId: string) => {
    const updatedCartItems = cartItems.filter(item => {
      const itemUniqueId = `${item.id}-${item.toppings.map((t: { name: string }) => t.name).join('-')}`;
      return itemUniqueId !== uniqueId;
    });
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxAndFees = subtotal * 0.1; // Assuming 10% tax and fees
  const delivery = 5.99; // Fixed delivery fee
  const total = subtotal + taxAndFees + delivery;

  const handleCheckout = () => {
    // Navigate to the checkout page
    window.location.href = '/checkout';
  };

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-20" onClick={onClose} />
      )}
      <div
        className={`fixed inset-y-0 right-0 w-96 bg-white shadow-2xl transition-transform duration-300 ease-in-out z-30 rounded-l-custom ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full rounded-l-custom">
          <div className="bg-lila text-white p-6 flex items-center justify-between rounded-tl-custom">
            <h2 className="text-2xl font-bold flex items-center">
              <ShoppingBag className="mr-2 h-6 w-6" />
              Your Cart
            </h2>
            <button
              className="text-white hover:text-snow transition-colors"
              onClick={onClose}
              aria-label="Close cart"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-grow overflow-auto p-6 bg-snow rounded-b-lg">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-lila">
                <ShoppingBag className="h-16 w-16 mb-4" />
                <p className="text-xl font-semibold">Your cart is empty</p>
                <p className="mt-2 text-sm">Add some delicious items to get started!</p>
              </div>
            ) : (
              <ul className="space-y-6">
                {cartItems.map((item) => {
                  const uniqueId = `${item.id}-${item.toppings.map((t: { name: string }) => t.name).join('-')}`; 
                  return (
                    <li key={uniqueId} className="bg-white rounded-lg shadow-md p-4 flex items-start space-x-4">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                      <div className="flex-grow">
                        <h3 className="font-semibold text-lila text-lg">{item.name}</h3>
                        <p className="text-lila font-medium">${item.price.toFixed(2)}</p>
                        {item.toppings.length > 0 && (
                          <div className="mt-2">
                            <p className="text-sm text-gray-600 font-medium">Toppings:</p>
                            <ul className="list-disc list-inside text-sm text-gray-500 ml-2">
                              {item.toppings
                                .filter((t: { selected: boolean; name: string }) => t.selected)
                                .map((t: { name: string }, index: number) => (
                                  <li key={index}>{t.name}</li>
                                ))}
                            </ul>
                          </div>
                        )}
                        <div className="flex items-center space-x-2 mt-3">
                          <button
                            className="h-8 w-8 rounded-full bg-lila text-white flex items-center justify-center hover:bg-opacity-80 transition-colors"
                            onClick={() => updateQuantity(uniqueId, -1)}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="text-lila font-medium">{item.quantity}</span>
                          <button
                            className="h-8 w-8 rounded-full bg-lila text-white flex items-center justify-center hover:bg-opacity-80 transition-colors"
                            onClick={() => updateQuantity(uniqueId, 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <button
                        className="text-red-500 hover:text-red-700 transition-colors"
                        onClick={() => removeItem(uniqueId)}
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          <div className="bg-white p-6 shadow-inner rounded-bl-custom">
            <div className="space-y-3 text-lila">
              <div className="flex justify-between items-center">
                <span>Subtotal:</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Tax & Fees:</span>
                <span className="font-medium">${taxAndFees.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Delivery:</span>
                <span className="font-medium">${delivery.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-lg">Total:</span>
                  <span className="font-bold text-lg">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center"> 
              <button
                className="bg-lila text-white px-4 py-3 rounded-full mt-6 font-semibold hover:bg-opacity-90 transition-colors"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div> 
          </div>
        </div>
      </div>
    </div>
  );
}
