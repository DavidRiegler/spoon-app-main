'use client'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { ChevronLeft, Home, Plus, CheckCircle, Circle } from 'lucide-react'

interface Address {
  id: string
  name: string
  address: string
}

export default function AddressManager() {
  const navigate = useNavigate(); // Initialize the navigate function
  const [addresses, setAddresses] = useState<Address[]>([])
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [newName, setNewName] = useState('')
  const [newAddress, setNewAddress] = useState('')
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null)

  useEffect(() => {
    const savedAddresses = localStorage.getItem('addresses')
    if (savedAddresses) {
      setAddresses(JSON.parse(savedAddresses))
    }
  }, [])

  const saveAddresses = (newAddresses: Address[]) => {
    localStorage.setItem('addresses', JSON.stringify(newAddresses))
    setAddresses(newAddresses)
  }

  const addNewAddress = () => {
    if (newName && newAddress) {
      const newAddressList = [...addresses, { id: Date.now().toString(), name: newName, address: newAddress }]
      saveAddresses(newAddressList)
      setNewName('')
      setNewAddress('')
      setIsAddingNew(false)
    }
  }

  const deleteAddress = (id: string) => {
    const newAddressList = addresses.filter(addr => addr.id !== id)
    saveAddresses(newAddressList)
    if (id === selectedAddressId) {
      setSelectedAddressId(null)
    }
  }

  const selectAddress = (id: string) => {
    if (id === selectedAddressId) {
      setSelectedAddressId(null)
    } else {
      setSelectedAddressId(id)
    }
  }

  const handleBackButtonClick = () => {
    if (isAddingNew) {
      // If in adding new address mode, switch back to address list
      setIsAddingNew(false);
    } else {
      // If in address list mode, navigate back
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-vanilla">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <header className="bg-vanilla p-4 flex items-center">
          <button 
            onClick={handleBackButtonClick} // Use the new handler
            className="text-lila"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-lila flex-grow text-center">
            {isAddingNew ? 'Add New Address' : 'Delivery Address'}
          </h1>
        </header>

        <main className="p-6">
          {!isAddingNew ? (
            <div>
              {addresses.map((addr) => (
                <div 
                  key={addr.id} 
                  className={`flex items-center justify-between mb-4 p-3 bg-white rounded-lg shadow-sm cursor-pointer ${addr.id === selectedAddressId ? 'bg-gray-100' : ''}`} 
                  onClick={() => selectAddress(addr.id)}
                >
                  <div className="flex items-center">
                    <Home className="h-6 w-6 text-purple-600 mr-2" />
                    <div>
                      <h2 className="font-semibold">{addr.name}</h2>
                      <p className="text-sm text-gray-600">{addr.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {addr.id === selectedAddressId ? (
                      <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                    ) : (
                      <Circle className="h-6 w-6 text-gray-400 mr-2" />
                    )}
                    <button 
                      onClick={(e) => { e.stopPropagation(); deleteAddress(addr.id); }}
                      className="p-1 rounded-full hover:bg-purple-100 transition-colors"
                    >
                      <Plus className="h-6 w-6 text-purple-600 rotate-45" />
                    </button>
                  </div>
                </div>
              ))}
              <button 
                className="w-full py-2 bg-pink text-white rounded-full hover:bg-pink-600 transition-colors"
                onClick={() => setIsAddingNew(true)}
              >
                Add New Address
              </button>
            </div>
          ) : (
            <div>
              <input
                type="text"
                placeholder="Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                placeholder="Address"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button 
                className="w-full py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                onClick={addNewAddress}
              >
                Apply
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
