'use client'

import { useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function AddCard() {
  const [cardDetails, setCardDetails] = useState({
    cardHolderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  })
  
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === 'cardNumber') {
      const formattedCardNumber = value.replace(/\D/g, '').substring(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ')
      setCardDetails(prev => ({ ...prev, cardNumber: formattedCardNumber }))
    } else if (name === 'cardHolderName') {
      const formattedName = value.replace(/[^a-zA-Z\s]/g, '')
      setCardDetails(prev => ({ ...prev, cardHolderName: formattedName }))
    } else if (name === 'expiryDate') {
      const formattedExpiryDate = value.replace(/\D/g, '').substring(0, 4).replace(/(\d{2})(?=\d)/, '$1/')
      setCardDetails(prev => ({ ...prev, expiryDate: formattedExpiryDate }))
    } else if (name === 'cvv') {
      const formattedCvv = value.replace(/\D/g, '').substring(0, 4)
      setCardDetails(prev => ({ ...prev, cvv: formattedCvv }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const { cvv, ...cardDataToStore } = cardDetails

    let cardType = '';
    const cardNumberDigits = cardDataToStore.cardNumber.replace(/\s/g, ''); 
    
    if (/^4/.test(cardNumberDigits)) {
      cardType = 'Visa';
    } else if (/^5[1-5]/.test(cardNumberDigits)) {
      cardType = 'MasterCard';
    } else if (/^3[47]/.test(cardNumberDigits)) {
      cardType = 'American Express';
    } else if (/^6(?:011|5)/.test(cardNumberDigits)) {
      cardType = 'Discover';
    } else {
      cardType = 'Unknown'; 
    }

    const savedCards = JSON.parse(localStorage.getItem('savedCards') || '[]')

    const cardExists = savedCards.some((card: any) => card.cardNumber === cardDataToStore.cardNumber)

    if (cardExists) {
      setErrorMessage('Card already saved')
    } else {
      // Generate a unique ID for the new card
      const maxId = savedCards.reduce((max: number, card: any) => 
        card.id > max ? card.id : max, 0
      )
      const newCard = {
        ...cardDataToStore,
        id: maxId + 1,
        type: cardType,
        label: 'Credit Card',
        selected: false
      }
      
      const updatedCards = [...savedCards, newCard]
      localStorage.setItem('savedCards', JSON.stringify(updatedCards))

      navigate(-1)
    }
  }

  return (
    <div className="min-h-screen bg-vanilla flex flex-col">
      <header className="bg-vanilla p-4 flex items-center">
        <button onClick={() => navigate(-1)} className="text-lila">
          <ChevronLeft size={36} />
        </button>
      </header>
      <div className="flex-grow flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-lila flex-grow text-center mr-9 mb-6">
            Add Card
          </h1>
          <div className="bg-lila text-white rounded-2xl p-6 mb-6 shadow-lg h-60 relative mx-8">
            <div className='bg-black w-s h-8 mb-4 -mx-6'></div>
            <div className='text-xs'>Card Number</div>
            <div className="text-2xl mb-4">{cardDetails.cardNumber || '0000 0000 0000 0000'}</div>
            <div className="flex justify-between">
              <div className='absolute left-6 bottom-6'>
                <div className="text-xs">Card Holder Name</div>
                <div>{cardDetails.cardHolderName || 'John Smith'}</div>
              </div>
              <div className='absolute right-6 bottom-6'>
                <div className="text-xs">Expiry Date</div>
                <div>{cardDetails.expiryDate || '04/28'}</div>
              </div>
            </div>
          </div>
          {errorMessage && (
            <div className="text-red-500 mb-4 text-center">{errorMessage}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="cardHolderName" className="block text-sm font-medium text-gray-700">
                Card holder name
              </label>
              <input
                type="text"
                id="cardHolderName"
                name="cardHolderName"
                value={cardDetails.cardHolderName}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-[#FFF9D4] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#D8A7B1] focus:border-[#D8A7B1]"
                required
              />
            </div>
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={cardDetails.cardNumber}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-[#FFF9D4] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#D8A7B1] focus:border-[#D8A7B1]"
                required
              />
            </div>
            <div className="flex space-x-4">
              <div className="flex-1">
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={cardDetails.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  className="mt-1 block w-full px-3 py-2 bg-[#FFF9D4] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#D8A7B1] focus:border-[#D8A7B1]"
                  required
                />
              </div>
              <div className="flex-1">
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 bg-[#FFF9D4] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#D8A7B1] focus:border-[#D8A7B1]"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-lila text-white py-3 rounded-full font-semibold hover:bg-[#7D3A57] transition-colors"
            >
              Save Card
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
