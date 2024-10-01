import React from 'react';
import Navbar from '../Navbar/page';
import Categories from './components/Categories/page';
import Bestsellers from './components/BestSellers/page';
import Recommended from './components/Recommended/page';

const HomePage: React.FC = () => {
  return (
    <div className="homepage bg-vanilla min-h-screen h-[130vh]">
      <Navbar />
      <main className="mx-auto mt-10 mb-10 ml-20 mr-20">
        <Categories />
        <div className="my-8 border-b-2 border-lila"></div>
        <Bestsellers />
        <div className="my-8 border-b-2 border-lila"></div>
        <Recommended />
      </main>
    </div>
  );
};

export default HomePage;