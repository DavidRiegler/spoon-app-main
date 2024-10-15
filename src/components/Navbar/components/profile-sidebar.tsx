import { X, User, CreditCard, Phone, HelpCircle, Settings, LogOut } from 'lucide-react';

interface ProfileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileSidebar({ isOpen, onClose }: ProfileSidebarProps) {
  const profileItems = [
    { icon: User, label: 'My Profile' },
    { icon: CreditCard, label: 'Payment Methods' },
    { icon: Phone, label: 'Contact Us' },
    { icon: HelpCircle, label: 'Help & FAQs' },
    { icon: Settings, label: 'Settings' },
  ];

  const userDataString = localStorage.getItem('userData');
  const user = userDataString ? JSON.parse(userDataString).user : { name: "", surname: "", email: "", propic: "" };

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-20" onClick={onClose} />
      )}
      <div
        className={`fixed inset-y-0 right-0 w-96 bg-white shadow-2xl transition-transform duration-300 ease-in-out z-30 rounded-l-custom ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full rounded-l-custom">
          <div className="bg-lila text-white p-6 flex items-center justify-between rounded-tl-custom">
            <button
              className="text-white transition-colors"
              onClick={onClose}
              aria-label="Close profile"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-grow overflow-auto p-6 bg-lila rounded-bl-custom">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="flex flex-row items-center pb-4">
                <img src={user.propic} alt="Profile Picture" className="rounded-full h-20 w-20 object-contain" />
                <div className="flex flex-col items-center mb-6">
                  <h2 className="text-3xl font-bold text-vanilla p-2">
                    {user.name || 'Guest'} {user.surname || ''}
                  </h2>
                  <p className="text-sm text-vanilla">{user.email || 'No email available'}</p>
                </div>
              </div>
              <ul className="space-y-6 flex-grow">
                {profileItems.map(({ icon: Icon, label }, index) => (
                  <li key={label} className={`flex items-center space-x-4 ${index < profileItems.length - 1 ? 'border-b border-vanilla' : ''} pb-4`}>
                    <a
                      className="flex items-center text-lg text-white hover:text-white"
                      href={`/${label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <Icon size={50} className="text-burnt bg-white p-2 rounded-xl" />
                      <span className="text-2xl pl-4">{label}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <a
                className="flex items-center space-x-4 text-lg text-white mt-auto"
                href="/"
                onClick={() => {
                  localStorage.clear();
                }}
              >
                <span className="p-1 pl-2 text-white font-bold text-2xl">Log Out</span>
                <LogOut size={50} className="text-burnt bg-white p-2 rounded-xl" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
