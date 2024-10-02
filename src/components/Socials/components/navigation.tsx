import { Bell, Bookmark, Hash, Home, Mail, User } from "lucide-react";

interface NavigationProps {
  onLogout: () => void;
}

export function Navigation({ onLogout }: NavigationProps) {
  return (
    <aside className="w-1/4 border-r p-4">
      <nav className="space-y-4">
        <a href="/" className="flex items-center w-full p-2 text-gray-700 hover:bg-gray-100 rounded-md">
          <Home className="mr-2 h-4 w-4" />
          Home
        </a>
        <a href="src/components/Socials/nav/explore" className="flex items-center w-full p-2 text-gray-700 hover:bg-gray-100 rounded-md">
          <Hash className="mr-2 h-4 w-4" />
          Explore
        </a>
        <a href="src/components/Socials/nav/notifications" className="flex items-center w-full p-2 text-gray-700 hover:bg-gray-100 rounded-md">
          <Bell className="mr-2 h-4 w-4" />
          Notifications
        </a>
        <a href="src/components/Socials/nav/messages" className="flex items-center w-full p-2 text-gray-700 hover:bg-gray-100 rounded-md">
          <Mail className="mr-2 h-4 w-4" />
          Messages
        </a>
        <a href="src/components/Socials/nav/bookmarks" className="flex items-center w-full p-2 text-gray-700 hover:bg-gray-100 rounded-md">
          <Bookmark className="mr-2 h-4 w-4" />
          Bookmarks
        </a>
        <a href="src/components/Socials/nav/profile" className="flex items-center w-full p-2 text-gray-700 hover:bg-gray-100 rounded-md">
          <User className="mr-2 h-4 w-4" />
          Profile
        </a>
      </nav>
      <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
        Tweet
      </button>
      <button
        className="mt-4 w-full border border-blue-500 text-blue-500 py-2 rounded-md hover:bg-blue-50"
        onClick={onLogout}
      >
        Logout
      </button>
    </aside>
  );
}
