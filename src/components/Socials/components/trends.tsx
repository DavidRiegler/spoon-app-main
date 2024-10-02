import { MoreHorizontal } from "lucide-react";

export function Trends() {
  return (
    <aside className="w-1/4 p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Twitter"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="border border-gray-300 rounded-lg">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Trends for you</h2>
        </div>
        <div className="p-4">
          <ul className="space-y-2">
            {[1, 2, 3, 4, 5].map((trend) => (
              <li key={trend} className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Trending in Tech</p>
                  <p className="font-semibold">#{`Trend${trend}`}</p>
                  <p className="text-sm text-gray-500">10.5K Tweets</p>
                </div>
                <button className="p-1 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
