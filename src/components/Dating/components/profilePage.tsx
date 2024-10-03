import { FaTimes } from 'react-icons/fa'

interface ProfilePageProps {
  onClose: () => void
}

export default function ProfilePage({ onClose }: ProfilePageProps) {
  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="relative">
        <img
          src="src/assets/prop-dating/prop-user1.png"
          alt="Profile"
          className="w-full h-64 object-cover"
        />
        <button
          className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md"
          onClick={onClose}
        >
          <FaTimes size={24} className="text-gray-600" />
        </button>
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-2">John Doe, 28</h2>
        <p className="text-gray-600 mb-4">Software Developer</p>
        <h3 className="text-xl font-semibold mb-2">About</h3>
        <p className="text-gray-700 mb-4">
          I'm a passionate developer who loves creating amazing apps. When I'm not coding, you can find me hiking or trying out new coffee shops.
        </p>
        <h3 className="text-xl font-semibold mb-2">Interests</h3>
        <div className="flex flex-wrap gap-2">
          {['Coding', 'Hiking', 'Coffee', 'Travel', 'Photography'].map((interest) => (
            <span key={interest} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
              {interest}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}