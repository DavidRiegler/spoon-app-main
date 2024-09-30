const bestSellers = [
  { name: 'Sushi Platter', price: 103.0, image: 'src/assets/PlaceholderPic.jpg' },
  { name: 'Chicken Stir Fry', price: 50.0, image: 'src/assets/PlaceholderPic.jpg' },
  { name: 'Vegetable Lasagna', price: 12.99, image: 'src/assets/PlaceholderPic.jpg' },
  { name: 'Berry Cupcake', price: 8.20, image: 'src/assets/PlaceholderPic.jpg' },
]

export default function BestSellers() {
  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold mb-4 flex justify-between items-center text-[#E57E60]">
        Best Seller
        <span className="text-[#7C3B7C] text-lg cursor-pointer">View All &gt;</span>
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {bestSellers.map((item) => (
          <div key={item.name} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center">
            <div className="w-full h-40 flex items-center justify-center overflow-hidden my-4">
              <img src={item.image} alt={item.name} className="w-60 h-40 object-contain" />
            </div>
            <div className="p-4 text-center">
              <h4 className="font-bold mb-2">{item.name}</h4>
              <p className="text-[#e67e51] font-bold">${item.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}