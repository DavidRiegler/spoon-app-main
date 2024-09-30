const recommendedItems = [
  { name: 'Classic Burger', price: 10.0, rating: 5.0, image: 'src/assets/PlaceholderPic.jpg' },
  { name: 'Vegetable Spring Rolls', price: 25.0, rating: 5.0, image: 'src/assets/PlaceholderPic.jpg' },
]

export default function Recommended() {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-4 text-[#E57E60]">Recommend</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {recommendedItems.map((item) => (
          <div key={item.name} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col sm:flex-row">
            <div className="w-full sm:w-1/3 h-40 flex items-center justify-center overflow-hidden my-4">
              <img src={item.image} alt={item.name} className="w-40 h-30 object-contain" />
            </div>
            <div className="p-4 flex-1">
              <div className="flex items-center mb-2">
                <span className="text-yellow-400 mr-1">★</span>
                <span>{item.rating.toFixed(1)}</span>
              </div>
              <h4 className="font-bold mb-2">{item.name}</h4>
              <p className="text-[#e67e51] font-bold">${item.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}