'use client';

import { useRouter } from 'next/navigation';
import { Navigation } from "../../navigation";
import { Trends } from "../../trends";

export default function Explore() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  const trendingTopics = [
    { id: 1, name: "#JavaScript", tweets: "120K" },
    { id: 2, name: "#ReactJS", tweets: "95K" },
    { id: 3, name: "#WebDev", tweets: "82K" },
    { id: 4, name: "#CodingLife", tweets: "78K" },
    { id: 5, name: "#TechNews", tweets: "65K" },
  ];

  return (
    <div className="container mx-auto flex min-h-screen">
      <Navigation onLogout={handleLogout} />
      <main className="w-1/2 border-r p-4">
        <h1 className="mb-4 text-xl font-bold">Explore</h1>
        <input
          type="text"
          placeholder="Search Twitter"
          className="mb-4 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="bg-white shadow rounded-lg overflow-hidden mb-4">
          <div className="border-b p-4">
            <h2 className="text-lg font-semibold">Trending Topics</h2>
          </div>
          <div className="p-4">
            <ul className="space-y-2">
              {trendingTopics.map((topic) => (
                <li key={topic.id} className="flex justify-between items-center">
                  <span className="font-medium">{topic.name}</span>
                  <span className="text-sm text-gray-500">{topic.tweets} Tweets</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="border-b p-4">
            <h2 className="text-lg font-semibold">Who to follow</h2>
          </div>
          <div className="p-4">
            <ul className="space-y-4">
              {["TechGuru", "CodeMaster", "DesignPro"].map((user, index) => (
                <li key={index} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium">{user}</p>
                      <p className="text-sm text-gray-500">@{user.toLowerCase()}</p>
                    </div>
                  </div>
                  <button className="border border-blue-500 text-blue-500 py-1 px-3 rounded-lg hover:bg-blue-500 hover:text-white transition">
                    Follow
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Trends />
    </div>
  );
}
