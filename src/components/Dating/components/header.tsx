import { FaUser, FaFire, FaComments } from 'react-icons/fa'

interface HeaderProps {
  onProfileClick: () => void
  onChatsClick: () => void
  onLogoClick: () => void
}

export default function Header({ onProfileClick, onChatsClick, onLogoClick }: HeaderProps) {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <button className="text-gray-500 focus:outline-none" onClick={onProfileClick}>
          <FaUser size={24} />
        </button>
        <button className="text-red-500 focus:outline-none" onClick={onLogoClick}>
          <FaFire size={32} />
        </button>
        <button className="text-gray-500 focus:outline-none" onClick={onChatsClick}>
          <FaComments size={24} />
        </button>
      </div>
    </header>
  )
}