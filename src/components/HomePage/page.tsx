import React from 'react';
import Navbar from '../Navbar/page';
import MapPage from './components/Map/page';

const HomePage: React.FC = () => {
  return (
    <div className="homepage bg-vanilla min-h-screen">
      <main className="mx-auto px-4 py-6 max-w-7xl">
        <Navbar />
        <div className='bg-pink rounded-b-xl'>
          <div className='bg-white pt-4 px-4 pb-4 rounded-tr-xl rounded-b-xl' id='map'>
            <MapPage />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
