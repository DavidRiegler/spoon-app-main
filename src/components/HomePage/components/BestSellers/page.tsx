import { useState, useRef, useEffect } from 'react'
import { Star, ChevronRight, ChevronLeft, ShoppingCart } from 'lucide-react'
import { motion } from 'framer-motion'

const bestSellers = [
  { id: 1, name: 'Sushi Platter', price: 103.0, image: 'src/assets/on-boarding/Pizza.jpg', rating: 4.8 },
  { id: 2, name: 'Chicken Stir Fry', price: 50.0, image: 'src/assets/on-boarding/Pizza.jpg', rating: 4.5 },
  { id: 3, name: 'Vegetable Lasagna', price: 12.99, image: 'src/assets/on-boarding/Pizza.jpg', rating: 4.2 },
  { id: 4, name: 'Berry Cupcake', price: 8.20, image: 'src/assets/on-boarding/Pizza.jpg', rating: 4.7 },
  { id: 5, name: 'Margherita Pizza', price: 15.99, image: 'src/assets/on-boarding/Pizza.jpg', rating: 4.6 },
  { id: 6, name: 'Beef Burger', price: 11.50, image: 'src/assets/on-boarding/Pizza.jpg', rating: 4.4 },
  { id: 7, name: 'Caesar Salad', price: 9.99, image: 'src/assets/on-boarding/Pizza.jpg', rating: 4.3 },
  { id: 8, name: 'Chocolate Brownie', price: 6.50, image: 'src/assets/on-boarding/Pizza.jpg', rating: 4.9 },
]

export default function BestSellers() {
  const [favorites, setFavorites] = useState<number[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [itemsPerPage, setItemsPerPage] = useState(4)

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2)
      } else {
        setItemsPerPage(4)
      }
    }

    updateItemsPerPage()
    window.addEventListener('resize', updateItemsPerPage)
    return () => window.removeEventListener('resize', updateItemsPerPage)
  }, [])

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    )
  }

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + itemsPerPage) % bestSellers.length)
  }

  const prevSlide = () => {
    setCurrentIndex(prev => (prev - itemsPerPage + bestSellers.length) % bestSellers.length)
  }

  const addToCart = (item: { id: number; name: string; price: number; quantity: number }) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const existingItemIndex = cartItems.findIndex((i: any) => i.id === item.id);

    if (existingItemIndex > -1) {
      cartItems[existingItemIndex].quantity += 1;
    } else {
      cartItems.push(item);
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    window.dispatchEvent(new Event('storage')); 
  }

  return (
    <div className="mb-8 relative">
      <h3 className="text-2xl font-bold mb-4 flex justify-between items-center text-burnt">
        Best Seller
        <span className="text-lila text-lg cursor-pointer" onClick={() => window.location.href = '/overview'}>View All &gt;</span>
      </h3>
      <div className="relative overflow-hidden" ref={containerRef}>
        <motion.div 
          className="flex transition-all duration-300 ease-in-out"
          animate={{ x: `-${currentIndex * (100 / itemsPerPage)}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {bestSellers.map((item) => (
            <div key={item.id} className={`flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 p-2`}>
              <div className="relative bg-snow rounded-lg shadow-md overflow-hidden">
                <div className="w-full h-40 flex items-center justify-center overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="absolute top-2 left-2 bg-white bg-opacity-100 rounded-full px-2 py-1 flex items-center text-sm">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <span className="font-bold text-burnt">{item.rating.toFixed(1)}</span>
                </div>
                <button 
                  onClick={() => toggleFavorite(item.id)}
                  className="absolute top-2 right-2 text-xl"
                >
                  {favorites.includes(item.id) ? '❤️' : '🤍'}
                </button>
                <div className="p-4">
                  <div className="flex justify-center items-center mb-2">
                    <button 
                      className="bg-burnt rounded-full p-2 hover:bg-orange-500"
                      onClick={() => addToCart({ ...item, quantity: 1 })}
                    >
                      <ShoppingCart className="w-5 h-5 text-white" />
                    </button>
                    <h4 className="font-bold text-sm truncate flex-1 text-center">{item.name}</h4>
                    <p className="text-burnt font-bold text-sm ml-2">${item.price.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      <button 
        onClick={prevSlide} 
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 shadow-md hover:bg-opacity-100 transition-opacity duration-300"
        aria-label="Previous items"
      >
        <ChevronLeft className="w-6 h-6 text-gray-600" />
      </button>
      <button 
        onClick={nextSlide} 
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 shadow-md hover:bg-opacity-100 transition-opacity duration-300"
        aria-label="Next items"
      >
        <ChevronRight className="w-6 h-6 text-gray-600" />
      </button>
    </div>
  )
}
