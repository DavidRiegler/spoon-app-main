import React from 'react';

const categories = [
  { name: 'Snacks', icon: 'src/assets/icons/Snacks.png' },
  { name: 'Meal', icon: 'src/assets/icons/Meals.png' },
  { name: 'Vegan', icon: 'src/assets/icons/Vegan.png' },
  { name: 'Dessert', icon: 'src/assets/icons/Desserts.png' },
  { name: 'Drinks', icon: 'src/assets/icons/Drinks.png' },
];

interface CategoriesProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({ selectedCategory, onCategorySelect }) => {
  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      onCategorySelect('All');
    } else {
      onCategorySelect(category);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between px-28 my-4 items-center">
        {categories.map((category) => (
          <div 
            key={category.name} 
            className={`flex flex-col items-center cursor-pointer ${selectedCategory === category.name ? 'opacity-100' : 'opacity-100'}`}
            onClick={() => handleCategoryClick(category.name)}
          >
            <div className="w-16 h-16 bg-vanilla rounded-3xl flex items-center justify-center shadow-md mb-2">
              <span className="text-3xl">
                <img 
                  src={category.icon} 
                  className="rounded-full w-full h-full object-cover border-2 border-vanilla" 
                  alt={category.name} 
                />
              </span>
            </div>
            <span className={`text-base text-lila ${selectedCategory === category.name ? 'font-extrabold' : 'font-medium'}`}>{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
