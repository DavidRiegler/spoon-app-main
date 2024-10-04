import React from 'react';

const bestSellers = [
  { id: 1, name: 'Sushi Platter', price: 103.0, image: 'src/assets/on-boarding/Pizza.jpg' },
  { id: 2, name: 'Chicken Stir Fry', price: 50.0, image: 'src/assets/on-boarding/Pizza.jpg' },
  { id: 3, name: 'Vegetable Lasagna', price: 12.99, image: 'src/assets/on-boarding/Pizza.jpg' },
  { id: 4, name: 'Berry Cupcake', price: 8.20, image: 'src/assets/on-boarding/Pizza.jpg' },
];

const Bestsellers: React.FC = () => {
  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold mb-4 flex justify-between items-center text-burnt">
        Best Seller
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {bestSellers.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={item.image} alt={item.name} className="w-full h-32 object-cover" />
            <div className="p-2">
              <h4 className="font-bold text-sm truncate">{item.name}</h4>
              <p className="text-[#d67ab1] font-bold text-sm">${item.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bestsellers;