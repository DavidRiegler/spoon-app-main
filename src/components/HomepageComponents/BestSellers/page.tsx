import { useState } from 'react';
import { Star } from 'lucide-react';

const bestSellers = [
  { id: 1, name: 'Sushi Platter', price: 103.0, image: 'src/assets/PlaceholderPic.jpg', rating: 4.8 },
  { id: 2, name: 'Chicken Stir Fry', price: 50.0, image: 'src/assets/PlaceholderPic.jpg', rating: 4.5 },
  { id: 3, name: 'Vegetable Lasagna', price: 12.99, image: 'src/assets/PlaceholderPic.jpg', rating: 4.2 },
  { id: 4, name: 'Berry Cupcake', price: 8.20, image: 'src/assets/PlaceholderPic.jpg', rating: 4.7 },
]

export default function BestSellers() {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold mb-4 flex justify-between items-center text-[#E57E60]">
        Best Seller
        <span className="text-[#7C3B7C] text-lg cursor-pointer" onClick={() => window.location.href = '/overview'}>View All &gt;</span>
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {bestSellers.map((item) => (
          <div key={item.id} className="relative bg-white rounded-lg shadow-md overflow-hidden">
            <div className="w-full h-40 flex items-center justify-center overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full" />
            </div>
            <div className="absolute top-2 left-2 bg-white bg-opacity-100 rounded-full px-2 py-1 flex items-center text-sm">
              <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
              <span className="font-bold text-orange-500">{item.rating.toFixed(1)}</span>
            </div>
            <button 
              onClick={() => toggleFavorite(item.id)}
              className="absolute top-2 right-2 text-xl"
            >
              {favorites.includes(item.id) ? '❤️' : '🤍'}
            </button>
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-sm truncate flex-1">{item.name}</h4>
                <p className="text-[#e67e51] font-bold text-sm ml-2">${item.price.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}