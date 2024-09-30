import { useState } from 'react';
import { Star } from 'lucide-react';

const recommendedItems = [
  { id: 1, name: 'Classic Burger', price: 10.0, rating: 5.0, image: 'src/assets/PlaceholderPic.jpg' },
  { id: 2, name: 'Vegetable Spring Rolls', price: 25.0, rating: 5.0, image: 'src/assets/PlaceholderPic.jpg' },
];

export default function Recommended() {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-4 text-[#E57E60]">Recommended</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
        {recommendedItems.map((item) => (
          <div key={item.id} className="relative bg-white rounded-lg shadow-md overflow-hidden h-64">
            <div className="absolute inset-0 flex items-center justify-center">
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
            
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-2 px-4 py-5">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-m truncate flex-1">{item.name}</h4>
                <p className="text-[#e67e51] font-bold text-m ml-2">${item.price.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}