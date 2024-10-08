import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const dishes = [
  { name: 'Margherita Pizza', description: 'Classic tomato, mozzarella, and basil pizza', price: '€10' },
  { name: 'Pasta Carbonara', description: 'Creamy pasta with pancetta and egg', price: '€12' },
  { name: 'Tiramisu', description: 'Traditional coffee-flavored Italian dessert', price: '€6' },
  { name: 'Caprese Salad', description: 'Fresh tomatoes, mozzarella, and basil', price: '€8' },
  { name: 'Osso Buco', description: 'Braised veal shanks with gremolata', price: '€18' },
  { name: 'Risotto al Funghi', description: 'Creamy mushroom risotto', price: '€14' },
  { name: 'Bruschetta', description: 'Grilled bread rubbed with garlic and topped with tomatoes', price: '€7' },
  { name: 'Panna Cotta', description: 'Italian dessert of sweetened cream thickened with gelatin', price: '€5' },
]

export default function RestaurantMenu() {
    const [currentPage, setCurrentPage] = useState(1)
    const dishesPerPage = 5
    const totalPages = Math.ceil(dishes.length / dishesPerPage)
  
    const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1))
    const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages))
  
    const currentDishes = dishes.slice((currentPage - 1) * dishesPerPage, currentPage * dishesPerPage)
  
    return (
      <div className="p-6 bg-white rounded-lg flex flex-col items-center justfy-center">
        <h2 className="text-3xl font-bold text-lila mb-6">Menu</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <div>
            <div className="grid gap-4 mb-4 w-full">
              {currentDishes.map((dish, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm w-128">
                  <h3 className="text-xl font-semibold text-lila mb-2">{dish.name}</h3>
                  <p className="text-gray-600 mb-2">{dish.description}</p>
                  <p className="text-burnt font-bold">{dish.price}</p>
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
              <span className="text-lg font-semibold">Page {currentPage} of {totalPages}</span>
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
      </div>
    )
  }
