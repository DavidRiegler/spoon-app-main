interface MatchModalProps {
  onClose: () => void
  onSendMessage: () => void
  matchedUser: {
    name: string
    image: string
  }
}

export default function MatchModal({ onClose, onSendMessage, matchedUser }: MatchModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 text-center max-w-sm w-full">
        <h2 className="text-3xl font-bold mb-4">It's a Match!</h2>
        <div className="flex justify-center mb-4">
          <img src={matchedUser.image} alt={matchedUser.name} className="w-24 h-24 rounded-full object-cover" />
        </div>
        <p className="text-xl mb-6">You and {matchedUser.name} have liked each other.</p>
        <div className="flex justify-center space-x-4">
          <button
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-full font-semibold hover:bg-gray-300 transition-colors"
            onClick={onClose}
          >
            Keep Swiping
          </button>
          <button 
            className="bg-red-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-600 transition-colors"
            onClick={onSendMessage}
          >
            Send a Message
          </button>
        </div>
      </div>
    </div>
  )
}