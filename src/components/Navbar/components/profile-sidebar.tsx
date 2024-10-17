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
        className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-2xl transition-transform duration-300 ease-in-out z-30 rounded-l-custom ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full rounded-l-custom">
          <div className="bg-lila text-white p-4 sm:p-6 flex items-center justify-between rounded-tl-custom">
            <button
              className="text-white transition-colors"
              onClick={onClose}
              aria-label="Close profile"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-grow overflow-auto p-4 sm:p-6 bg-lila rounded-bl-custom">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="flex flex-col sm:flex-row items-center pb-4">
                <img src={user.propic} alt="Profile Picture" className="rounded-full h-16 w-16 sm:h-20 sm:w-20 object-contain mb-2 sm:mb-0 sm:mr-4" />
                <div className="flex flex-col items-center sm:items-start mb-4 sm:mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-vanilla p-2">
                    {user.name || 'Guest'} {user.surname || ''}
                  </h2>
                  <p className="text-xs sm:text-sm text-vanilla">{user.email || 'No email available'}</p>
                </div>
              </div>
              <ul className="space-y-4 sm:space-y-6 flex-grow w-full">
                {profileItems.map(({ icon: Icon, label }, index) => (
                  <li key={label} className={`flex items-center space-x-4 ${index < profileItems.length - 1 ? 'border-b border-vanilla' : ''} pb-4`}>
                    <a
                      className="flex items-center text-base sm:text-lg text-white hover:text-white w-full"
                      href={`/${label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <Icon size={40} className="text-burnt bg-white p-2 rounded-xl" />
                      <span className="text-xl sm:text-2xl pl-4">{label}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <a
                className="flex items-center space-x-4 text-base sm:text-lg text-white mt-auto w-full justify-center"
                href="/"
                onClick={() => {
                  localStorage.clear();
                }}
              >
                <span className="p-1 pl-2 text-white font-bold text-xl sm:text-2xl">Log Out</span>
                <LogOut size={40} className="text-burnt bg-white p-2 rounded-xl" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}