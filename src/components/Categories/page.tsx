import React from 'react'

const categories = [
  { name: 'Snacks', icon: '🍿' },
  { name: 'Meal', icon: '🍽️' },
  { name: 'Vegan', icon: '🥗' },
  { name: 'Dessert', icon: '🍰' },
  { name: 'Drinks', icon: '🍹' },
]

export default function Categories() {
  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold mb-4">Categories</h3>
      <div className="flex flex-wrap justify-between">
        {categories.map((category) => (
          <div key={category.name} className="flex flex-col items-center mb-4 cursor-pointer hover:text-[#e67e51]">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mb-2">
              <span className="text-3xl">{category.icon}</span>
            </div>
            <span className="text-sm font-medium">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}