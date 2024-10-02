'use client';

import { useRouter } from 'next/navigation';
import { Navigation } from "../../navigation";
import { Trends } from "../../trends";
import { Bell, Heart, Repeat, MessageCircle } from "lucide-react";

export default function Notifications() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  const notifications = [
    { id: 1, type: 'like', user: 'TechGuru', content: 'liked your tweet', time: '2h ago' },
    { id: 2, type: 'retweet', user: 'CodeMaster', content: 'retweeted your tweet', time: '4h ago' },
    { id: 3, type: 'mention', user: 'DesignPro', content: 'mentioned you in a tweet', time: '1d ago' },
    { id: 4, type: 'follow', user: 'WebDev101', content: 'followed you', time: '2d ago' },
    { id: 5, type: 'reply', user: 'JSEnthusiast', content: 'replied to your tweet', time: '3d ago' },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="w-5 h-5 text-red-500" />;
      case 'retweet':
        return <Repeat className="w-5 h-5 text-green-500" />;
      case 'mention':
      case 'reply':
        return <MessageCircle className="w-5 h-5 text-blue-500" />;
      case 'follow':
        return <Bell className="w-5 h-5 text-purple-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="container mx-auto flex min-h-screen">
      <Navigation onLogout={handleLogout} />
      <main className="w-1/2 border-r p-4">
        <h1 className="mb-4 text-xl font-bold">Notifications</h1>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div key={notification.id} className="bg-white rounded-lg shadow-md mb-2">
              <div className="flex items-center p-4">
                {getIcon(notification.type)}
                <div className="ml-4">
                  <p className="font-medium">{notification.user} {notification.content}</p>
                  <p className="text-sm text-gray-500">{notification.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Trends />
    </div>
  );
}
