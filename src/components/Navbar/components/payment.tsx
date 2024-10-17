'use client'

import React, { useState, useEffect } from 'react'
import { ArrowLeft, CreditCard, MapPin, X } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faApple, faPaypal, faGoogle } from '@fortawesome/free-brands-svg-icons'

type CardPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedCard: any;
  onSubmit: (cardData: any) => void;
}

const formatCardNumber = (cardNumber: string) => {
  const cleaned = cardNumber.replace(/\s/g, '');
  return cleaned.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
};

const CardPopup: React.FC<CardPopupProps> = ({ isOpen, onClose, selectedCard, onSubmit }) => {
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });

  useEffect(() => {
    if (selectedCard) {
      setCardData({
        cardNumber: selectedCard.cardNumber ? formatCardNumber(selectedCard.cardNumber) : '',
        cardHolder: selectedCard.cardHolderName || '',
        expiryDate: selectedCard.expiryDate || '',
        cvv: '' 
      });
    }
  }, [selectedCard]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(cardData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md relative">
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 text-lila hover:text-pink transition-colors"
          aria-label="Close popup"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-lila mb-6">Card Details</h2>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
              <input
                  type="text"
                  value={cardData.cardNumber}
                  onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').substring(0, 16);
                      const formattedValue = formatCardNumber(value); 
                      setCardData(prev => ({ ...prev, cardNumber: formattedValue }));
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lila focus:border-lila"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  pattern="^(\d{4} ){3}\d{4}$"
              />
          </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Card Holder</label>
              <input
                type="text"
                value={cardData.cardHolder}
                onChange={(e) => setCardData(prev => ({ ...prev, cardHolder: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lila focus:border-lila"
                placeholder="John Doe"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                <input
                  type="text"
                  value={cardData.expiryDate}
                  onChange={(e) => setCardData(prev => ({ ...prev, expiryDate: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lila focus:border-lila"
                  placeholder="MM/YY"
                  maxLength={5}
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                <input
                  type="password"
                  value={cardData.cvv}
                  onChange={(e) => setCardData(prev => ({ ...prev, cvv: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lila focus:border-lila"
                  placeholder="123"
                  maxLength={4}
                  pattern="\d*"
                />
              </div>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-lila text-white rounded-full py-4 mt-6 font-bold hover:bg-pink transition-colors"
          >
            Confirm Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default function Payment() {
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [address, setAddress] = useState<string>(''); 
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<any>(null);
    const [isCardPopupOpen, setIsCardPopupOpen] = useState(false);

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

        const savedPaymentMethod = JSON.parse(localStorage.getItem('payment-method') || 'null');
        if (savedPaymentMethod?.cardNumber) {
            savedPaymentMethod.cardNumber = formatCardNumber(savedPaymentMethod.cardNumber);
        }
        if (savedPaymentMethod) {
            setSelectedPaymentMethod(savedPaymentMethod);
        }
    }, []);

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const taxAndFees = subtotal * 0.1;
    const delivery = 5.99;
    const total = subtotal + taxAndFees + delivery;

    const handlePayNow = () => {
        if (selectedPaymentMethod?.cardNumber) {
            setIsCardPopupOpen(true);
        } else {
            // TODO: Add payment with other methods
        }
    };

    const handleCardPayment = () => {
        // TODO: Add payment with card 
        setIsCardPopupOpen(false);
    };

    const renderPaymentMethodIcon = (type: string) => {
        switch (type?.toLowerCase()) {
            case 'apple':
                return <FontAwesomeIcon icon={faApple} className="text-lila" size="lg" />;
            case 'paypal':
                return <FontAwesomeIcon icon={faPaypal} className="text-lila" size="lg" />;
            case 'google':
                return <FontAwesomeIcon icon={faGoogle} className="text-lila" size="lg" />;
            default:
                return <CreditCard className="text-lila" size={24} />;
        }
    };

    const renderPaymentMethodInfo = () => {
        if (!selectedPaymentMethod) {
            return <span className="text-black">No payment method selected</span>;
        }

        if (['apple', 'google', 'paypal'].includes(selectedPaymentMethod.type?.toLowerCase())) {
            return (
                <>
                    {renderPaymentMethodIcon(selectedPaymentMethod.type)}
                    <span className="text-black">{selectedPaymentMethod.label}</span>
                </>
            );
        }

        if (selectedPaymentMethod.cardNumber) {
            const lastFour = selectedPaymentMethod.cardNumber.replace(/\s/g, '').slice(-4);
            return (
                <>
                    <CreditCard className="text-lila" size={24} />
                    <div className="flex flex-col">
                        <span className="text-black font-medium">{selectedPaymentMethod.type}</span>
                        <span className="text-sm text-gray-600">**** {lastFour}</span>
                    </div>
                </>
            );
        }

        return (
            <>
                {renderPaymentMethodIcon(selectedPaymentMethod.type)}
                <span className="text-black">{selectedPaymentMethod.label}</span>
            </>
        );
    };

    return (
        <div className="bg-vanilla min-h-screen p-4 sm:p-5">
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-4 sm:p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <ArrowLeft 
                className="text-lila hover:cursor-pointer" 
                size={20} 
                onClick={() => window.location.href = '/checkout'}
              />
              <h1 className="text-lila text-xl sm:text-2xl font-bold">Payment</h1>
              <div className="flex gap-3">
              </div>
            </div>

                <div className="mb-6 border-t-2 pt-4">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-lila font-semibold text-xl">Shipping Address</h2>
                        <button 
                            className="bg-lila rounded px-3 py-1 text-white"
                            onClick={() => window.location.href = '/address-manager'}
                        >
                            Edit
                        </button>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg flex items-start gap-3">
                        <MapPin className="text-lila mt-1" size={20} />
                        <span className="text-black flex-1">{address || 'No address selected'}</span>
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
                                        <h3 className="font-semibold text-lila">{item.name}</h3>
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
                            <button 
                                className="bg-lila rounded px-3 py-1 text-white"
                                onClick={() => window.location.href = '/payment-methods'}
                            >
                                Edit
                            </button>
                        </div>
                        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                            {renderPaymentMethodInfo()}
                        </div>
                    </div>

                    <div className="mb-6 border-t-2 pt-4">
                        <h2 className="text-lila font-semibold text-xl mb-3">Delivery Time</h2>
                        <div className="flex justify-between">
                            <span>Estimated Delivery</span>
                            <span>25 mins</span>
                        </div>
                    </div>

                    <button 
                        className="w-full bg-lila border-none rounded-full py-3 sm:py-4 text-white text-base sm:text-lg font-bold"
                        onClick={handlePayNow}
                    >
                        Pay Now
                    </button>
                </div>
            </div>

            <CardPopup
                isOpen={isCardPopupOpen}
                onClose={() => setIsCardPopupOpen(false)}
                selectedCard={selectedPaymentMethod}
                onSubmit={handleCardPayment}
            />
        </div>
    )
}