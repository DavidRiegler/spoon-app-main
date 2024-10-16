import React from 'react';
import Navbar from '../Navbar/page';
import Sort from './components/sortBy';

const Food: React.FC = () => {
  return (
    <div className="homepage bg-vanilla min-h-screen">
      <main className="mx-auto px-2 sm:px-4 py-4 sm:py-6 max-w-7xl">
        <Navbar />
        <div className='bg-pink rounded-b-xl'>
          <div className='bg-white pt-2 sm:pt-4 px-2 sm:px-4 pb-4 rounded-t-xl rounded-b-xl'>
            <Sort />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Food;