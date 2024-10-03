interface ChatPreview {
  id: string
  name: string
  lastMessage: string
  time: string
}

interface ChatListProps {
  chats: ChatPreview[]
  onChatSelect: (chatId: string) => void
}

export default function ChatList({ chats, onChatSelect }: ChatListProps) {
  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
      <h2 className="text-2xl font-semibold p-4 border-b">Chats</h2>
      {chats.length === 0 ? (
        <p className="p-4 text-center text-gray-500">No chats yet. Start swiping to match!</p>
      ) : (
        <ul>
          {chats.map((chat) => (
            <li key={chat.id} className="border-b last:border-b-0">
              <button
                className="w-full text-left p-4 hover:bg-gray-50 transition-colors"
                onClick={() => onChatSelect(chat.id)}
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{chat.name}</span>
                  <span className="text-sm text-gray-500">{chat.time}</span>
                </div>
                <p className="text-gray-600 truncate">{chat.lastMessage}</p>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}