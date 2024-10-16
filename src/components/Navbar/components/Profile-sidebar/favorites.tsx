import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import Categories from '../../../Food/components/categories';
import Navbar from '../../page';

interface Topping {
  name: string;
  price: number;
  selected: boolean;
}

interface Item {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  categories: string[];
  description: string;
  toppings: Topping[];
}

const allItems: Item[] = [
  // The items array (unchanged from your initial code)
];

export default function Sort() {
  const [favorites, setFavorites] = useState<Item[]>([]);
  const [sortOption, setSortOption] = useState<string>('priceAsc');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [itemsToShow, setItemsToShow] = useState<number>(6); // State to manage number of items shown
  const navigate = useNavigate();

  // Load favorite items from localStorage on component mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoriteFood');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Toggle favorite status for an item
  const toggleFavorite = (id: number) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.some((item) => item.id === id)
        ? prevFavorites.filter((item) => item.id !== id)
        : [...prevFavorites, allItems.find((item) => item.id === id)!];

      // Update localStorage with the updated favorites
      localStorage.setItem('favoriteFood', JSON.stringify(updatedFavorites));

      return updatedFavorites;
    });
  };

  // Filter items by the selected category and sort them based on the selected option
  const filteredAndSortedItems = () => {
    return favorites
      .filter((item) => selectedCategory === 'All' || item.categories.includes(selectedCategory))
      .sort((a, b) => {
        switch (sortOption) {
          case 'priceAsc':
            return a.price - b.price;
          case 'priceDesc':
            return b.price - a.price;
          case 'nameAsc':
            return a.name.localeCompare(b.name);
          case 'nameDesc':
            return b.name.localeCompare(a.name);
          case 'rating':
            return b.rating - a.rating;
          default:
            return 0;
        }
      });
  };

  const handleItemClick = (item: Item) => {
    navigate(`/food-details`, { state: { item } });
  };

  const handleLoadMore = () => {
    setItemsToShow((prev) => prev + 6); // Increase the number of items shown by 6
  };

  return (
    <div className="homepage bg-vanilla min-h-screen">
      <main className="mx-auto px-4 py-6 max-w-7xl">
        <Navbar />
        <div className="bg-pink rounded-b-xl">
          <div className="bg-white pt-4 px-4 pb-4 rounded-t-xl rounded-b-xl">
            <div className="flex items-center justify-center p-4">
              <h1 className="text-burnt text-5xl font-bold">Favorites</h1>
            </div>
            <div className="min-h-screen">
              <Categories selectedCategory={selectedCategory} onCategorySelect={setSelectedCategory} />
              <div className="mx-auto px-4">
                <div className="flex items-center mb-8">
                  Sort by:
                  <select
                    onChange={(e) => setSortOption(e.target.value)}
                    value={sortOption}
                    className="text-lila ml-2"
                  >
                    <option value="priceAsc">Price Ascending</option>
                    <option value="priceDesc">Price Descending</option>
                    <option value="nameAsc">Name A-Z</option>
                    <option value="nameDesc">Name Z-A</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
                {favorites.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {filteredAndSortedItems()
                      .slice(0, itemsToShow)
                      .map((item) => (
                        <div key={item.id} className="bg-white rounded-3xl shadow-lg overflow-hidden">
                          <div className="relative">
                            <img src={item.image} alt={item.name} className="h-64 w-full object-cover" />
                            <div className="bg-white bg-opacity-100 rounded-full p-1 px-2 flex items-center absolute top-2 left-2">
                              <Star className="w-5 h-5 text-yellow-400 fill-current" />
                              <span className="ml-1 text-sm font-bold text-burnt">
                                {item.rating.toFixed(1)}
                              </span>
                            </div>
                            <button
                              onClick={() => toggleFavorite(item.id)}
                              className="absolute top-2 right-2 text-xl"
                            >
                              {favorites.some((fav) => fav.id === item.id) ? '💜' : '🤍'}
                            </button>
                            <div className="absolute bottom-2 left-2 bg-pink text-white rounded-full px-3 py-1 text-sm font-bold">
                              ${item.price.toFixed(2)}
                            </div>
                          </div>
                          <div className="p-4 flex justify-between">
                            <h2 className="text-xl font-bold mb-2">{item.name}</h2>
                            <button
                              className="bg-pink rounded-full p-2 text-white font-bold"
                              onClick={() => handleItemClick(item)}
                            >
                              Find Out More
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-center text-xl font-bold">No favorites selected yet.</p>
                )}
                {itemsToShow < filteredAndSortedItems().length && (
                  <div className="flex justify-center mt-4">
                    <button onClick={handleLoadMore} className="bg-pink text-white font-bold px-4 py-2 rounded-full">
                      Load More
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
