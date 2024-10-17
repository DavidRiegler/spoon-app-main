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
    <div className="mb-4 sm:mb-8">
      <div className="flex justify-between px-2 sm:px-8 md:px-16 lg:px-28 my-2 sm:my-4 items-center overflow-x-auto">
        {categories.map((category) => (
          <div 
            key={category.name} 
            className={`flex flex-col items-center cursor-pointer min-w-[80px] mx-1 sm:mx-2 ${
              selectedCategory === category.name ? 'opacity-100' : 'opacity-100'
            }`}
            onClick={() => handleCategoryClick(category.name)}
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-vanilla rounded-3xl flex items-center justify-center shadow-md mb-1 sm:mb-2">
              <img 
                src={category.icon} 
                className="rounded-full w-full h-full object-contain border-2 border-vanilla" 
                alt={category.name} 
              />
            </div>
            <span className={`text-sm sm:text-base text-lila ${
              selectedCategory === category.name ? 'font-extrabold' : 'font-medium'
            }`}>
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
