import React from 'react';

const categories = [
  { name: 'Snacks', icon: '🍿' },
  { name: 'Meal', icon: '🍽️' },
  { name: 'Vegan', icon: '🥗' },
  { name: 'Dessert', icon: '🍰' },
  { name: 'Drinks', icon: '🍹' },
];

const Categories: React.FC = () => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        {categories.map((category) => (
          <div key={category.name} className="flex flex-col items-center cursor-pointer">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mb-2 border-2 border-[#e57e60]">
              <span className="text-3xl">{category.icon}</span>
            </div>
            <span className="text-sm font-medium text-[#e57e60]">{category.name}</span>
          </div>
        ))}
        <div className="flex flex-col items-center cursor-pointer"> 
          <span className="text-xl font-medium text-burnt">View All &gt;</span>
        </div>
      </div>
    </div>
  );
};

export default Categories;