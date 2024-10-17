'use client'

import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faApple, faPaypal, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 'pm1', type: 'apple', label: 'Apple Pay', icon: faApple, selected: false },
    { id: 'pm2', type: 'paypal', label: 'Paypal', icon: faPaypal, selected: false },
    { id: 'pm3', type: 'google', label: 'Google Pay', icon: faGoogle, selected: false },
  ])
  
  const [savedCards, setSavedCards] = useState<any[]>([])

  const navigate = useNavigate()

  useEffect(() => {
    const cardsFromStorage = JSON.parse(localStorage.getItem('savedCards') || '[]');
    setSavedCards(cardsFromStorage);
  
    const savedPaymentMethod = JSON.parse(localStorage.getItem('payment-method') || 'null');
  
    const updatedMethods = paymentMethods.map(method => ({ ...method, selected: false }));
    const updatedCards = cardsFromStorage.map((card: any) => ({ ...card, selected: false }));
  
    if (savedPaymentMethod) {
      if (['apple', 'paypal', 'google'].includes(savedPaymentMethod.type)) {
        const methodIndex = updatedMethods.findIndex(method => method.type === savedPaymentMethod.type);
        if (methodIndex !== -1) {
          updatedMethods[methodIndex].selected = true;
        }
      } else {
        const cardIndex = updatedCards.findIndex((card: any) => card.id === savedPaymentMethod.id);
        if (cardIndex !== -1) {
          updatedCards[cardIndex].selected = true; 
        }
      }
    }
  
    setPaymentMethods(updatedMethods);
    setSavedCards(updatedCards);
  }, []);  

  const handleSelection = (id: number | string) => {
    const updatedMethods = paymentMethods.map(method => ({ ...method, selected: false }));
    const updatedCards = savedCards.map(card => ({ ...card, selected: false }));

    const cardIndex = savedCards.findIndex(card => card.id === id);
    
    if (cardIndex !== -1) {
      const isCurrentlySelected = savedCards[cardIndex].selected;
      if (!isCurrentlySelected) {
        updatedCards[cardIndex].selected = true;
        localStorage.setItem('payment-method', JSON.stringify(updatedCards[cardIndex]));
      } else {
        localStorage.removeItem('payment-method');
      }
    } else {
      const methodIndex = updatedMethods.findIndex(method => method.id === id);
      if (methodIndex !== -1) {
        const isCurrentlySelected = paymentMethods[methodIndex].selected;
        if (!isCurrentlySelected) {
          updatedMethods[methodIndex].selected = true;
          localStorage.setItem('payment-method', JSON.stringify(updatedMethods[methodIndex]));
        } else {
          localStorage.removeItem('payment-method');
        }
      }
    }

    setPaymentMethods(updatedMethods);
    setSavedCards(updatedCards);
  }

  const handleDeleteCard = (cardId: string) => {
    const updatedCards = savedCards.filter(card => card.id !== cardId);
    setSavedCards(updatedCards);
    
    localStorage.setItem('savedCards', JSON.stringify(updatedCards));
    
    const savedPaymentMethod = JSON.parse(localStorage.getItem('payment-method') || 'null');
    if (savedPaymentMethod && savedPaymentMethod.id === cardId) {
      localStorage.removeItem('payment-method');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center flex-col bg-vanilla relative p-4">
      <header className="flex items-center mb-4 sm:mb-6 w-full max-w-md lg:max-w-lg xl:max-w-xl">
        <button onClick={() => navigate(-1)} className="top-4 left-4">
          <ChevronLeft className="text-lila" size={28} />
        </button>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-lila flex-grow text-center mr-6">
          Payment Methods
        </h1>
      </header>
      <div className="bg-vanilla rounded-3xl p-4 sm:p-8 w-full max-w-md lg:max-w-lg xl:max-w-xl">
        <div className="bg-white rounded-lg shadow-md p-3 sm:p-4">
          {savedCards.length > 0 && (
            <div>
              {savedCards.map((card) => (
                <div
                  key={card.id}
                  className="flex items-center justify-between py-3 sm:py-4 border-b border-gray-200"
                >
                  <div className="flex items-center flex-grow">
                    <FontAwesomeIcon icon={faCreditCard} className="text-lila mr-3 sm:mr-4" size="lg" />
                    <span className="text-sm sm:text-lg text-black">**** **** **** {card.cardNumber.slice(-4)}</span>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <button 
                      className="text-red-500 hover:text-red-700 transition-colors"
                      onClick={() => handleDeleteCard(card.id)}
                      aria-label="Delete card"
                    >
                      <FontAwesomeIcon icon={faTrash} size="lg" />
                    </button>
                    <button 
                      className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 ${card.selected ? 'bg-lila border-pink' : 'border-pink'}`}
                      onClick={() => handleSelection(card.id)}
                      aria-label={card.selected ? 'Deselect card' : 'Select card'}
                    ></button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="flex items-center justify-between py-3 sm:py-4 border-b border-gray-200 last:border-b-0"
            >
              <div className="flex items-center">
                <FontAwesomeIcon icon={method.icon} className="text-lila mr-3 sm:mr-4" size="lg" />
                <span className="text-sm sm:text-lg text-black">{method.label}</span>
              </div>
              <button 
                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 ${method.selected ? 'bg-lila border-pink' : 'border-pink'}`}
                onClick={() => handleSelection(method.id)}
                aria-label={method.selected ? 'Deselect payment method' : 'Select payment method'}
              ></button>
            </div>
          ))}
        </div>

        <button 
          className="mt-4 sm:mt-6 w-full bg-pink text-white py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base"
          onClick={() => navigate('/add-card')}
        >
          Add New Card
        </button>
      </div>
    </div>
  )
}