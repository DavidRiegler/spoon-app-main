import { X, Plus, Minus, Trash2 } from 'lucide-react'

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
  cartItems: any[]
  setCartItems: (items: any[]) => void
}

export default function CartSidebar({ isOpen, onClose, cartItems, setCartItems }: CartSidebarProps) {
  const updateQuantity = (id: number, change: number) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
    ).filter(item => item.quantity > 0)
    
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
    setCartItems(updatedCartItems)
  }

  const removeItem = (id: number) => {
    const updatedCartItems = cartItems.filter(item => item.id !== id)
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
    setCartItems(updatedCartItems)
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const taxAndFees = subtotal * 0.1 // Assuming 10% tax and fees
  const delivery = 5.99 // Fixed delivery fee
  const total = subtotal + taxAndFees + delivery

  return (
    <div
      className={`fixed inset-y-0 right-0 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out z-30 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-6 bg-[#FCF7F8] h-full flex flex-col">
        <button
          className="absolute top-4 right-4 text-lila"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
          <span className="sr-only">Close cart</span>
        </button>
        <h2 className="text-xl font-bold mb-4 text-lila">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p className="text-lila">Your cart is empty</p>
        ) : (
          <>
            <ul className="space-y-4 flex-grow overflow-auto">
              {cartItems.map((item) => (
                <li key={item.id} className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lila">{item.name}</h3>
                    <p className="text-sm text-lila">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      className="h-6 w-6 rounded-full bg-snow text-lila flex items-center justify-center"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <Minus className="h-4 w-4" />
                      <span className="sr-only">Decrease quantity</span>
                    </button>
                    <span className="text-lila">{item.quantity}</span>
                    <button
                      className="h-6 w-6 rounded-full bg-snow text-lila flex items-center justify-center"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <Plus className="h-4 w-4" />
                      <span className="sr-only">Increase quantity</span>
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove item</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-2 border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lila">Subtotal:</span>
                <span className="text-lila">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lila">Tax & Fees:</span>
                <span className="text-lila">${taxAndFees.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lila">Delivery:</span>
                <span className="text-lila">${delivery.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-lila">Total:</span>
                  <span className="font-bold text-lila">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <button className="w-full bg-lila text-white px-4 py-2 rounded-md mt-4">
              Checkout
            </button>
          </>
        )}
      </div>
    </div>
  )
}