import { useState } from 'react'
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  toppings: Topping[]
  image: string
}

interface Topping {
  name: string
  price: number
  selected: boolean
}

const dishes = [
  { id: 1, name: 'Margherita Pizza', description: 'Classic tomato, mozzarella, and basil pizza', price: 10, image: '../src/assets/prop-food/Pizza.jpg' },
  { id: 2, name: 'Pasta Carbonara', description: 'Creamy pasta with pancetta and egg', price: 12, image: '/images/carbonara.jpg' },
  { id: 3, name: 'Tiramisu', description: 'Traditional coffee-flavored Italian dessert', price: 6, image: '/images/tiramisu.jpg' },
  { id: 4, name: 'Caprese Salad', description: 'Fresh tomatoes, mozzarella, and basil', price: 8, image: '/images/caprese.jpg' },
  { id: 5, name: 'Osso Buco', description: 'Braised veal shanks with gremolata', price: 18, image: '/images/osso-buco.jpg' },
  { id: 6, name: 'Risotto al Funghi', description: 'Creamy mushroom risotto', price: 14, image: '/images/risotto.jpg' },
  { id: 7, name: 'Bruschetta', description: 'Grilled bread rubbed with garlic and topped with tomatoes', price: 7, image: '/images/bruschetta.jpg' },
  { id: 8, name: 'Panna Cotta', description: 'Italian dessert of sweetened cream thickened with gelatin', price: 5, image: '/images/panna-cotta.jpg' },
]

const addToCart = (item: CartItem) => {
  const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]')

  const uniqueId = item.id + '-' + item.toppings.map(t => t.name).join('-')

  const existingItemIndex = cartItems.findIndex((i: CartItem) => {
    const currentUniqueId = i.id + '-' + i.toppings.map(t => t.name).join('-')
    return currentUniqueId === uniqueId
  })

  if (existingItemIndex > -1) {
    cartItems[existingItemIndex].quantity += item.quantity
  } else {
    cartItems.push(item)
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems))
  window.dispatchEvent(new Event('storage'))
}

export default function RestaurantMenu() {
  const [currentPage, setCurrentPage] = useState(1)
  const dishesPerPage = 5
  const totalPages = Math.ceil(dishes.length / dishesPerPage)

  const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1))
  const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages))

  const currentDishes = dishes.slice((currentPage - 1) * dishesPerPage, currentPage * dishesPerPage)

  const handleAddToCart = (dish: typeof dishes[0]) => {
    const cartItem: CartItem = {
      id: dish.id,
      name: dish.name,
      price: dish.price,
      quantity: 1, 
      toppings: [], 
      image: dish.image,
    }
    addToCart(cartItem)
  }

  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg flex flex-col items-center justify-center">
      <h2 className="text-2xl sm:text-3xl font-bold text-lila mb-4 sm:mb-6">Menu</h2>
      <div className="w-full">
        <div className="grid gap-4 mb-4 w-full">
          {currentDishes.map((dish, index) => (
            <div key={index} className="bg-gray-100 p-3 sm:p-4 rounded-lg shadow-sm w-full flex flex-col sm:flex-row items-center">
              <img 
                src={dish.image} 
                alt={dish.name} 
                className="w-full sm:w-24 h-32 sm:h-24 object-cover rounded-lg mb-3 sm:mb-0 sm:mr-4" 
              />
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-semibold text-lila mb-1 sm:mb-2">{dish.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{dish.description}</p>
                <p className="text-burnt font-bold">€{dish.price}</p>
              </div>
              <button 
                onClick={() => handleAddToCart(dish)} 
                className="mt-3 sm:mt-0 sm:ml-auto px-4 py-2 bg-lila text-white rounded-md hover:bg-lila-dark flex items-center justify-center"
              >
                <ShoppingCart size={16} className="mr-1" /> Add to Cart
              </button>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-4">
          <button 
            onClick={handlePrevPage} 
            disabled={currentPage === 1}
            className="p-2 rounded-full bg-gray-200 text-gray-600 disabled:opacity-50"
          >
            <ChevronLeft size={24} />
          </button>
          <span className="text-sm sm:text-lg font-semibold">Page {currentPage} of {totalPages}</span>
          <button 
            onClick={handleNextPage} 
            disabled={currentPage === totalPages}
            className="p-2 rounded-full bg-gray-200 text-gray-600 disabled:opacity-50"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  )
}