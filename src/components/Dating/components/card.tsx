export default function Card() {
    return (
      <div className="w-full max-w-sm bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src="src/assets/prop-dating/prop-user1.png"
          alt="Profile"
          className="w-full h-[400px] object-contain mt-0"
        />
        <div className="p-4 bg-gray-100">
          <h2 className="text-2xl font-semibold">Rachel Brockman, 22</h2>
          <p className="text-gray-600">OF hoe</p>
        </div>
      </div>
    )
  }