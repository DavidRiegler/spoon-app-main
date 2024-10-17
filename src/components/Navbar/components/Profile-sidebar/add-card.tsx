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
      <header className="bg-vanilla p-2 sm:p-4 flex items-center">
        <button onClick={() => navigate(-1)} className="text-lila">
          <ChevronLeft size={24} className="sm:w-9 sm:h-9" />
        </button>
      </header>
      <div className="flex-grow flex flex-col items-center justify-center px-4 py-4 sm:py-8">
        <div className="w-full max-w-md">
          <h1 className="text-2xl sm:text-3xl font-bold text-lila text-center mb-4 sm:mb-6">
            Add Card
          </h1>
          <div className="bg-lila text-white rounded-2xl shadow-lg relative mx-auto mb-6 w-[300px] h-[180px] sm:w-[360px] sm:h-[220px] md:w-[400px] md:h-[240px]">
            <div className="absolute top-6 left-0 right-0 bg-black h-8 sm:h-10"></div>
            <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-between">
              <div className="mt-12 sm:mt-16">
                <div className="text-[10px] sm:text-xs opacity-80">Card Number</div>
                <div className="font-mono text-lg sm:text-2xl tracking-wider">
                  {cardDetails.cardNumber || '0000 0000 0000 0000'}
                </div>
              </div>
            </div>
            <div className="absolute bottom-4 w-full px-4 sm:px-6 flex justify-between items-end">
              <div>
                <div className="text-[10px] sm:text-xs opacity-80">Card Holder Name</div>
                <div className="text-sm sm:text-base font-medium truncate max-w-[150px] sm:max-w-[200px]">
                  {cardDetails.cardHolderName || 'John Smith'}
                </div>
              </div>
              <div>
                <div className="text-[10px] sm:text-xs opacity-80 text-right">Expiry Date</div>
                <div className="text-sm sm:text-base font-medium">
                  {cardDetails.expiryDate || '04/28'}
                </div>
              </div>
            </div>
          </div>
          {errorMessage && (
            <div className="text-red-500 mb-4 text-center text-sm sm:text-base">{errorMessage}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4 px-4 sm:px-0">
            <div>
              <label htmlFor="cardHolderName" className="block text-xs sm:text-sm font-medium text-gray-700">
                Card holder name
              </label>
              <input
                type="text"
                id="cardHolderName"
                name="cardHolderName"
                value={cardDetails.cardHolderName}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-[#FFF9D4] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#D8A7B1] focus:border-[#D8A7B1] text-sm sm:text-base"
                required
              />
            </div>
            <div>
              <label htmlFor="cardNumber" className="block text-xs sm:text-sm font-medium text-gray-700">
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={cardDetails.cardNumber}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-[#FFF9D4] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#D8A7B1] focus:border-[#D8A7B1] text-sm sm:text-base"
                required
              />
            </div>
            <div className="flex space-x-4">
              <div className="flex-1">
                <label htmlFor="expiryDate" className="block text-xs sm:text-sm font-medium text-gray-700">
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={cardDetails.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  className="mt-1 block w-full px-3 py-2 bg-[#FFF9D4] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#D8A7B1] focus:border-[#D8A7B1] text-sm sm:text-base"
                  required
                />
              </div>
              <div className="flex-1">
                <label htmlFor="cvv" className="block text-xs sm:text-sm font-medium text-gray-700">
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 bg-[#FFF9D4] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#D8A7B1] focus:border-[#D8A7B1] text-sm sm:text-base"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-lila text-white py-2.5 sm:py-3 rounded-full font-semibold hover:bg-[#7D3A57] transition-colors text-sm sm:text-base mt-6"
            >
              Save Card
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}