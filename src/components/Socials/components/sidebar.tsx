import { HomeIcon, PlusIcon, SunIcon, UserIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'

export default function Sidebar() {
  const menuItems = [
    { icon: HomeIcon, label: 'Home', href: '/' },
    { icon: PlusIcon, label: 'Create post', href: '/create' },
    { icon: SunIcon, label: 'Messages', href: '/messages' },
    { icon: UserIcon, label: 'Profile', href: '/profile' },
    { icon: Cog6ToothIcon, label: 'Settings', href: '/settings' },
  ]

  return (
    <div className="fixed left-0 h-[calc(100vh-3.5rem)] w-64 bg-white text-black p-4 flex flex-col border-r mt-2">
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <a href={item.href} className="flex items-center space-x-4 p-2 rounded hover:bg-gray-900">
                <item.icon className="h-6 w-6" />
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}