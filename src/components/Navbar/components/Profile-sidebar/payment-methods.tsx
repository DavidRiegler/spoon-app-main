'use client'

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard } from '@fortawesome/free-solid-svg-icons'
import { faApple, faPaypal, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

export default function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: 'card', label: '*** *** *** 43', icon: faCreditCard, selected: false },
    { id: 2, type: 'apple', label: 'Apple Pay', icon: faApple, selected: false },
    { id: 3, type: 'paypal', label: 'Paypal', icon: faPaypal, selected: false },
    { id: 4, type: 'google', label: 'Google Play', icon: faGoogle, selected: false },
  ])

  const handleSelection = (id: number) => {
    setPaymentMethods(paymentMethods.map(method => 
      method.id === id ? { ...method, selected: true } : { ...method, selected: false }
    ))
  }

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center flex-col bg-vanilla relative">
      <header className="flex items-center mb-6 w-full max-w-md">
        <button
            onClick={() => navigate(-1)}
            className="top-4 left-4"
            >
            <ChevronLeft className="text-lila" size={36} />
        </button>
        <h1 className="text-2xl font-semibold text-lila flex-grow text-center mr-6">
          Payment Methods
        </h1>
      </header>
      <div className="bg-vanilla rounded-3xl p-8 w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md p-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0"
            >
              <div className="flex items-center">
                <FontAwesomeIcon icon={method.icon} className="text-lila mr-4" size="lg" />
                <span className="text-lg text-black">{method.label}</span>
              </div>
              <button 
                className={`w-6 h-6 rounded-full border-2 ${
                  method.selected ? 'bg-lila border-pink' : 'border-pink'
                }`}
                onClick={() => handleSelection(method.id)}
              ></button>
            </div>
          ))}
        </div>
        <button className="mt-6 w-full bg-pink text-white py-3 rounded-full font-semibold" onClick={() => window.location.href = '/add-card'}>
          Add New Card
        </button>
      </div>
    </div>
  )
}