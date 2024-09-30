import React from 'react';
import Navbar from '../HomepageComponents/Navbar/page';
import Categories from '../HomepageComponents/Categories/page';
import Bestsellers from '../HomepageComponents/BestSellers/page';
import Recommended from '../HomepageComponents/Recommended/page';

const HomePage: React.FC = () => {
  return (
    <div className="homepage bg-vanilla min-h-screen h-[130vh]">
      <Navbar />
      <main className="container mx-auto mt-10 mb-10">
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