import React from 'react';
import { X, Settings, Settings2, Verified, User, Flag, LogOut } from 'lucide-react';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsPage({ isOpen, onClose }: SettingsProps) {
  const settingsItems = [
    { icon: Settings2, label: 'Change Preferences', href: '/dating/preferences' },
    { icon: Verified, label: 'Get Verified!', href: '/dating/verification' },
    { icon: User, label: 'Profile Settings', href: '/dating/profile' },
    { icon: Flag, label: 'Report Issues', href: '/dating/report' },
  ];

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-20" onClick={onClose} />
      )}
      <div
        className={`fixed inset-y-0 left-0 w-96 bg-white shadow-2xl transition-transform duration-300 ease-in-out z-30 rounded-r-custom ${
          isOpen ? 'translate-x-0' : 'translate-x-[-100%]'
        }`}
      >
        <div className="flex flex-col h-full rounded-r-custom">
          <div className="bg-lila text-white p-6 flex items-center justify-between rounded-tr-custom">
            <button
              className="text-white transition-colors"
              onClick={onClose}
              aria-label="Close settings"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-grow overflow-auto p-6 bg-lila rounded-br-custom">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="flex flex-row p-2 justify-between items-center pb-10">
                <Settings size={50} className="text-burnt bg-white p-2 rounded-xl" />
                <h1 className="p-1 pl-2 text-vanilla font-bold text-3xl">Settings</h1>
              </div>

              <ul className="space-y-6 flex-grow">
                {settingsItems.map(({ icon: Icon, label, href }, index) => (
                  <li
                    key={label}
                    className={`flex items-center space-x-4 ${
                      index < settingsItems.length - 1 ? 'border-b border-vanilla' : ''
                    } pb-4`}
                  >
                    <a
                      className="flex items-center text-lg text-white hover:text-white"
                      href={href}
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
                <span className="p-1 pl-2 text-white font-bold text-2xl">Quit</span>
                <LogOut size={50} className="text-burnt bg-white p-2 rounded-xl" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
