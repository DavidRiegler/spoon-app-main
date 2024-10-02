import { X, User, CreditCard, Phone, HelpCircle, Settings, LogOut } from 'lucide-react'

interface ProfileSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function ProfileSidebar({ isOpen, onClose }: ProfileSidebarProps) {
  const profileItems = [
    { icon: User, label: 'My Profile' },
    { icon: CreditCard, label: 'Payment Methods' },
    { icon: Phone, label: 'Contact Us' },
    { icon: HelpCircle, label: 'Help & FAQs' },
    { icon: Settings, label: 'Settings' },
  ]

  const userDataString = localStorage.getItem('userData');
  const user = userDataString ? JSON.parse(userDataString).user : { name: "", surname: "", email: "" };

  return (
    <div
      className={`fixed inset-y-0 right-0 w-64 bg-[#FCF7F8] shadow-lg transition-transform duration-300 ease-in-out z-30 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-6 h-full flex flex-col">
        <button
          className="absolute top-4 right-4 text-lila"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
          <span className="sr-only">Close profile</span>
        </button>
        <div className="flex items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-lila">{user.name || 'Guest'} {user.surname || ''}</h2>
            <p className="text-sm text-lila">{user.email || 'No email available'}</p>
          </div>
        </div>
        <ul className="space-y-4 flex-grow">
          {profileItems.map(({ icon: Icon, label }) => (
            <li key={label}>
              <a
                className="flex items-center space-x-4 text-lg text-lila hover:text-lila"
                href={`/${label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <Icon className="h-6 w-6" />
                <span>{label}</span>
              </a>
            </li>
          ))}
        </ul>
        <a className="flex items-center space-x-4 text-lg text-lila mt-auto" href="/" onClick={() => { localStorage.clear(); }}>
          <LogOut className="h-6 w-6" />
          <span>Log Out</span>
        </a>
      </div>
    </div>
  )
}