import { useState } from 'react'
import Navbar from '../../../Navbar/page'
import { Star, ShoppingCart, ChevronLeft } from 'lucide-react'

const allItems = [
  { id: 1, name: 'Sushi Platter', price: 103.0, rating: 4.8, image: 'src/assets/on-boarding/Pizza.jpg', description: 'Fresh sushi assortment...' },
  { id: 2, name: 'Chicken Stir Fry', price: 50.0, rating: 4.5, image: 'src/assets/on-boarding/Pizza.jpg', description: 'Savory chicken and vegetables...' },
  { id: 3, name: 'Vegetable Lasagna', price: 12.99, rating: 4.2, image: 'src/assets/on-boarding/Pizza.jpg', description: 'Layers of pasta and veggies...' },
  { id: 4, name: 'Berry Cupcake', price: 8.20, rating: 4.7, image: 'src/assets/on-boarding/Pizza.jpg', description: 'Sweet cupcake with berries...' },
  { id: 5, name: 'Classic Burger', price: 10.0, rating: 5.0, image: 'src/assets/on-boarding/Pizza.jpg', description: 'Juicy beef patty with toppings...' },
  { id: 6, name: 'Vegetable Spring Rolls', price: 25.0, rating: 4.9, image: 'src/assets/on-boarding/Pizza.jpg', description: 'Crispy rolls with veggies...' },
]

export default function Overview() {
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    )
  }

  return (
    <div className='bg-vanilla min-h-screen'>
      <Navbar />
      <div className="mx-auto px-4 py-8 ml-20 mr-20">
        <div className='flex items-center mb-8'>
          <a href="/homepage" className="flex items-center">
            <ChevronLeft className="w-10 h-10 text-burnt" />
            <h1 className="text-3xl font-bold text-burnt ml-2">Best Sellers</h1>
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allItems.map((item) => (
            <div key={item.id} className="bg-white rounded-3xl shadow-lg overflow-hidden">
              <div className="relative">
                <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                <div className="absolute top-2 left-2 bg-white rounded-full p-2">
                  {/* todo icons */}
                </div>
                <button 
                    onClick={() => toggleFavorite(item.id)}
                    className="absolute top-2 right-2 text-xl"
                    >
                    {favorites.includes(item.id) ? '❤️' : '🤍'}
                </button>
                <div className="absolute bottom-2 right-2 bg-lila text-white rounded-full px-3 py-1 text-sm font-bold">
                  ${item.price.toFixed(2)}
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{item.name}</h2>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-bold text-orange-500">{item.rating.toFixed(1)}</span>
                  </div>
                  <button
                    className="bg-burnt rounded-full p-2 hover:bg-orange-500"
                  >
                    <ShoppingCart className="w-5 h-5 text-white" />
                  </button>
                </div>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}