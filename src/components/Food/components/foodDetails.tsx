import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ChevronLeft, Heart, Minus, Plus, ShoppingCart, Star } from 'lucide-react'

interface Topping {
  name: string
  price: number
  selected: boolean
}

interface Item {
  id: number
  name: string
  price: number
  rating: number
  image: string
  description: string
  toppings: Topping[]
}

// Extend the type to include selected toppings
interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  toppings: Topping[] // Add this line to store selected toppings
}

const addToCart = (item: CartItem) => {
  const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
  
  // Create a unique identifier based on item id and selected toppings
  const uniqueId = item.id + '-' + item.toppings.map(t => t.name).join('-');

  const existingItemIndex = cartItems.findIndex((i: CartItem) => {
    const currentUniqueId = i.id + '-' + i.toppings.map(t => t.name).join('-');
    return currentUniqueId === uniqueId;
  });
  
  if (existingItemIndex > -1) {
    cartItems[existingItemIndex].quantity += item.quantity; // Update quantity
  } else {
    cartItems.push(item); // Add new item with toppings
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  window.dispatchEvent(new Event('storage')); 
}

export default function FoodDetails() {
  const navigate = useNavigate()
  const location = useLocation()
  const { item } = location.state as { item: Item }
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [toppings, setToppings] = useState(item.toppings)

  const toggleTopping = (index: number) => {
    const newToppings = [...toppings]
    newToppings[index].selected = !newToppings[index].selected
    setToppings(newToppings)
  }

  const totalPrice = item.price + toppings.reduce((sum, topping) => 
    topping.selected ? sum + topping.price : sum, 0
  )

  return (
    <div className="bg-vanilla min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-lg p-6 w-full max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <button className="text-lila mr-2" onClick={() => navigate(-1)}>
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold text-lila">{item.name}</h1>
          </div>
          <button onClick={() => setIsFavorite(!isFavorite)}>
            <Heart size={24} fill={isFavorite ? 'purple' : 'none'} color={isFavorite ? 'purple' : 'black'} />
          </button>
        </div>

        <div className="flex items-center mb-4">
          <Star className="w-5 h-5 text-yellow-400 fill-current" />
          <span className="ml-1 text-sm font-bold">{item.rating.toFixed(1)}</span>
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 pr-0 md:pr-4 mb-4 md:mb-0">
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 pl-0 md:pl-4">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-600 mb-4">{item.description}</p>

            <h3 className="text-lg font-semibold mb-2">Toppings</h3>
            <div className="space-y-2 mb-4">
              {toppings.map((topping, index) => (
                <div key={topping.name} className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={topping.selected}
                      onChange={() => toggleTopping(index)}
                      className="mr-2 accent-lila"
                    />
                    {topping.name}
                  </label>
                  <span>${topping.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4 grid grid-cols-3 gap-4"> 
          <span className="text-2xl font-bold">${totalPrice.toFixed(2)}</span>
          <div className="flex items-center justify-center col-span-1"> 
            <div className="flex items-center ml-4">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="bg-gray-200 rounded-full p-2"
              >
                <Minus size={16} />
              </button>
              <span className="mx-4 text-xl">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="bg-gray-200 rounded-full p-2"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
          <button className="bg-lila text-white rounded-full py-2 px-6 flex items-center w-2/3 justify-center col-span-1"  onClick={() => addToCart({ 
              id: item.id, 
              name: item.name, 
              price: totalPrice, 
              quantity, 
              toppings: toppings.filter(topping => topping.selected) // Only include selected toppings
            })}>
            <ShoppingCart className="mr-2"/>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
