import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import Categories from './categories';

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
  restaurantId: number;
  restaurantName: string;
}

const allItems: Item[] = [
  {
    id: 1,
    name: 'Sushi Platter',
    price: 103.0,
    rating: 4.8,
    image: 'src/assets/prop-food/SushiPlatter.jpg',
    categories: ['Meal'],
    description: 'A delicious sushi platter with a variety of rolls.',
    toppings: [
      { name: 'Wasabi', price: 1.0, selected: false },
      { name: 'Soy Sauce', price: 0.5, selected: false },
    ],
    restaurantId: 101,
    restaurantName: 'Sushi House',
  },
  {
    id: 2,
    name: 'Jack Daniels',
    price: 15.0,
    rating: 5.0,
    image: 'src/assets/prop-food/JackDaniels.jpg',
    categories: ['Drinks'],
    description: 'Smooth and rich whiskey.',
    toppings: [
      { name: 'Ice Cubes', price: 0.0, selected: true },
      { name: 'Coca Cola', price: 2.0, selected: false },
    ],
    restaurantId: 102,
    restaurantName: 'Whiskey Bar',
  },
  {
    id: 3,
    name: 'Vegetable Lasagna',
    price: 12.99,
    rating: 4.2,
    image: 'src/assets/prop-food/VegetableLasagna.jpg',
    categories: ['Meal', 'Vegan'],
    description: 'Layers of pasta with fresh vegetables and vegan cheese.',
    toppings: [
      { name: 'Mushrooms', price: 1.5, selected: false },
      { name: 'Olives', price: 1.0, selected: false },
      { name: 'Spinach', price: 0.5, selected: false },
    ],
    restaurantId: 103,
    restaurantName: 'Vegan Bistro',
  },
  {
    id: 4,
    name: 'Berry Cupcake',
    price: 8.20,
    rating: 4.7,
    image: 'src/assets/prop-food/BerryCupcake.jpg',
    categories: ['Snacks', 'Dessert'],
    description: 'Delicious cupcake topped with fresh berries.',
    toppings: [
      { name: 'Cream Cheese Frosting', price: 0.5, selected: false },
      { name: 'Chocolate Drizzle', price: 0.3, selected: false },
    ],
    restaurantId: 104,
    restaurantName: 'Cupcake Cafe',
  },
  {
    id: 5,
    name: 'Classic Burger',
    price: 10.0,
    rating: 5.0,
    image: 'src/assets/on-boarding/delivery.jpg',
    categories: ['Meal'],
    description: 'Juicy beef burger with fresh toppings.',
    toppings: [
      { name: 'Cheese', price: 1.0, selected: false },
      { name: 'Bacon', price: 1.5, selected: false },
      { name: 'Lettuce', price: 0.2, selected: false },
      { name: 'Fries', price: 5.0, selected: false },
    ],
    restaurantId: 105,
    restaurantName: 'Burger Joint',
  },
  {
    id: 6,
    name: 'Vegetable Spring Rolls',
    price: 5.0,
    rating: 4.9,
    image: 'src/assets/prop-food/VegetableSpringrolls.jpg',
    categories: ['Snacks', 'Vegan'],
    description: 'Crispy spring rolls filled with fresh vegetables. (Snack Sized)',
    toppings: [{ name: 'Sweet Chili Sauce', price: 0.5, selected: false }],
    restaurantId: 106,
    restaurantName: 'Spring Roll House',
  },
  {
    id: 7,
    name: 'Vegetable Spring Rolls',
    price: 10.0,
    rating: 4.9,
    image: 'src/assets/prop-food/VegetableSpringrolls.jpg',
    categories: ['Meal', 'Vegan'],
    description: 'Crispy spring rolls filled with fresh vegetables. (Meal sized)',
    toppings: [{ name: 'Sweet Chili Sauce', price: 0.5, selected: false }],
    restaurantId: 106,
    restaurantName: 'Spring Roll House',
  },
];

export default function Sort() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [sortOption, setSortOption] = useState<string>('priceAsc');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [itemsToShow, setItemsToShow] = useState<number>(6); 
  const navigate = useNavigate();

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoriteFood');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites).map((item: Item) => item.id));
    }
  }, []);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      let updatedFavorites: number[];
      if (prev.includes(id)) {
        updatedFavorites = prev.filter((itemId) => itemId !== id);
      } else {
        updatedFavorites = [...prev, id];
      }

      const favoriteItems = allItems.filter((item) => updatedFavorites.includes(item.id));
      localStorage.setItem('favoriteFood', JSON.stringify(favoriteItems));

      return updatedFavorites;
    });
  };

  const filteredAndSortedItems = () => {
    return allItems
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
    setItemsToShow((prev) => prev + 6);
  };

  return (
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {filteredAndSortedItems()
            .slice(0, itemsToShow)
            .map((item) => (
              <button 
                key={item.id} 
                className="bg-white rounded-3xl shadow-lg overflow-hidden w-full text-left" 
                onClick={() => handleItemClick(item)}
              >
                <div className="relative">
                  <img src={item.image} alt={item.name} className="h-64 w-full object-cover" />
                  <div className="bg-white bg-opacity-100 rounded-full p-1 px-2 flex items-center absolute top-2 left-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-bold text-burnt">
                      {item.rating.toFixed(1)}
                    </span>
                  </div>
                  <button onClick={() => toggleFavorite(item.id)} className="absolute top-2 right-2 text-xl">
                    {favorites.includes(item.id) ? '💜' : '🤍'}
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
              </button>
            ))}
        </div>
        {itemsToShow < filteredAndSortedItems().length && (
          <div className="flex justify-center mt-4">
            <button onClick={handleLoadMore} className="bg-pink text-white font-bold px-4 py-2 rounded-full">
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
