import React, { useState } from 'react';
import Navbar from '../Navbar/page';
import Categories from './components/Categories/page';
import Bestsellers from './components/BestSellers/page';
import Recommended from './components/Recommended/page';

const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  return (
    <div className="homepage bg-[#f9e9b0] min-h-screen">
      <main className="mx-auto px-4 py-6 max-w-7xl">
        <Navbar />
        <div className='bg-pink rounded-b-xl'>
          <div className='bg-white pt-4 px-4 pb-4 rounded-tr-xl rounded-b-xl'>
            <Categories selectedCategory={selectedCategory} onCategorySelect={setSelectedCategory} />
            <Bestsellers />
            <Recommended />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
