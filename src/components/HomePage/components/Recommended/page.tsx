import React from 'react';
import { Star } from 'lucide-react';
import { useState } from 'react';

const recommendedItems = [
  { id: 1, name: 'Classic Burger', price: 10.0, rating: 5.0, image: 'src/assets/on-boarding/Pizza.jpg' },
  { id: 2, name: 'Vegetable Spring Rolls', price: 25.0, rating: 5.0, image: 'src/assets/on-boarding/Pizza.jpg' },
  { id: 3, name: 'Classic Burger', price: 10.0, rating: 5.0, image: 'src/assets/on-boarding/Pizza.jpg' },
  { id: 4, name: 'Vegetable Spring Rolls', price: 25.0, rating: 5.0, image: 'src/assets/on-boarding/Pizza.jpg' },
];

const Recommended: React.FC = () => {

  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-4 text-[#e57e60]">Recommend</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {recommendedItems.map((item) => (
          <div key={item.id} className="relative bg-white rounded-lg shadow-md overflow-hidden">
            <img src={item.image} alt={item.name} className="w-full h-32 object-cover" />
            <div className="absolute top-2 left-2 flex space-x-2">
              <div className="bg-white bg-opacity-100 rounded-full px-2 py-1 flex items-center text-sm">
                <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                <span className="font-bold text-orange-500">{item.rating.toFixed(1)}</span>
              </div>
              <button 
                onClick={() => toggleFavorite(item.id)}
                className="text-lg border-2 border-vanilla bg-vanilla rounded-full p-1"
              >
                {favorites.includes(item.id) ? '💜' : '🤍'}
              </button>
            </div>
            <div className="p-2">
              <h4 className="font-bold text-sm truncate">{item.name}</h4>
              <p className="text-[#d67ab1] font-bold text-sm">${item.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommended;