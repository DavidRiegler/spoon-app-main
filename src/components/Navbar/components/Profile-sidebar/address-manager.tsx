import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Home, CheckCircle, Circle, X } from 'react-feather';

interface Address {
  id: string;
  name: string;
  address: string;
}

export default function AddressManager() {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newName, setNewName] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);

  useEffect(() => {
    const savedAddresses = localStorage.getItem('addresses');
    const userData = localStorage.getItem('userData');
    
    if (savedAddresses) {
      setAddresses(JSON.parse(savedAddresses));
    }

    if (userData) {
      const parsedUserData = JSON.parse(userData);
      if (parsedUserData.user && parsedUserData.user.selectedAddress) {
        setSelectedAddressId(parsedUserData.user.selectedAddress.id);
      }
    }
  }, []);

  const saveAddresses = (newAddresses: Address[]) => {
    localStorage.setItem('addresses', JSON.stringify(newAddresses));
    setAddresses(newAddresses);
  };

  const addNewAddress = () => {
    if (newName && newAddress) {
      const newAddressList = [...addresses, { id: Date.now().toString(), name: newName, address: newAddress }];
      saveAddresses(newAddressList);
      setNewName('');
      setNewAddress('');
      setIsAddingNew(false);
    }
  };

  const deleteAddress = (id: string) => {
    const newAddressList = addresses.filter(addr => addr.id !== id);
    saveAddresses(newAddressList);
    if (id === selectedAddressId) {
      setSelectedAddressId(null);
      updateUserData(null);
    }
  };

  const selectAddress = (id: string) => {
    const newSelectedId = id === selectedAddressId ? null : id;
    setSelectedAddressId(newSelectedId);
    updateUserData(newSelectedId);
  };

  const updateUserData = (selectedId: string | null) => {
    const userData = localStorage.getItem('userData');
    let parsedUserData = userData ? JSON.parse(userData) : { user: {} };

    if (selectedId) {
      const selectedAddress = addresses.find(addr => addr.id === selectedId);
      if (selectedAddress) {
        parsedUserData.user.selectedAddress = selectedAddress;  
      }
    } else {
      delete parsedUserData.user.selectedAddress;  
    }

    localStorage.setItem('userData', JSON.stringify(parsedUserData));
  };

  const handleBackButtonClick = () => {
    if (isAddingNew) {
      setIsAddingNew(false);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen bg-vanilla flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <header className="bg-lila p-4 flex items-center">
          <button
            onClick={handleBackButtonClick}
            className="text-white hover:text-lila-light transition-colors"
            aria-label={isAddingNew ? 'Cancel adding new address' : 'Go back'}
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl sm:text-2xl font-bold text-white flex-grow text-center">
            {isAddingNew ? 'Add New Address' : 'Delivery Address'}
          </h1>
        </header>

        <main className="p-4 sm:p-6 space-y-4">
          {!isAddingNew ? (
            <>
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className="flex items-center justify-between p-3 sm:p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-lila-light cursor-pointer"
                  onClick={() => selectAddress(addr.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-lila bg-opacity-10 p-2 rounded-full">
                      <Home className="h-5 w-5 text-lila" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-gray-800">{addr.name}</h2>
                      <p className="text-sm text-gray-600">{addr.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {addr.id === selectedAddressId ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-400" />
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteAddress(addr.id);
                      }}
                      className="p-1 rounded-full hover:bg-pink-100 transition-colors"
                      aria-label={`Delete address for ${addr.name}`}
                    >
                      <X className="h-5 w-5 text-pink" />
                    </button>
                  </div>
                </div>
              ))}
              <button
                className="w-full py-3 bg-pink text-white rounded-full hover:bg-pink-dark transition-colors text-base sm:text-lg font-medium"
                onClick={() => setIsAddingNew(true)}
              >
                Add New Address
              </button>
            </>
          ) : (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full p-3 border border-lila-light rounded-lg focus:outline-none focus:ring-2 focus:ring-lila"
              />
              <input
                type="text"
                placeholder="Address"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                className="w-full p-3 border border-lila-light rounded-lg focus:outline-none focus:ring-2 focus:ring-lila"
              />
              <button
                className="w-full py-3 bg-lila text-white rounded-full hover:bg-lila-dark transition-colors text-base sm:text-lg font-medium"
                onClick={addNewAddress}
              >
                Apply
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
