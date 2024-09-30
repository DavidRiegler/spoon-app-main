import React from 'react'

const bestSellers = [
  { name: 'Sushi Platter', price: 103.0, image: '/placeholder.svg?height=160&width=240' },
  { name: 'Chicken Stir Fry', price: 50.0, image: '/placeholder.svg?height=160&width=240' },
  { name: 'Vegetable Lasagna', price: 12.99, image: '/placeholder.svg?height=160&width=240' },
  { name: 'Berry Cupcake', price: 8.20, image: '/placeholder.svg?height=160&width=240' },
]

export default function BestSellers() {
  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold mb-4 flex justify-between items-center">
        Best Seller
        <span className="text-[#e67e51] text-lg cursor-pointer">View All &gt;</span>
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {bestSellers.map((item) => (
          <div key={item.name} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h4 className="font-bold mb-2">{item.name}</h4>
              <p className="text-[#e67e51] font-bold">${item.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}