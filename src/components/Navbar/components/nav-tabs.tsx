export default function NavTabs() {
    const tabs = [
      { name: 'Homepage', href: '/homepage' },
      { name: 'Socials', href: '/socials' },
      { name: 'Food', href: '/food' },
      { name: 'Dating', href: '/dating' },
      { name: 'Quiz', href: '/quiz' },
    ]
  
    return (
      <div className="flex bg-snow px-2 -mr-1">
        {tabs.map((tab) => (
          <a
            key={tab.name}
            href={tab.href}
            className="relative px-4 py-2 text-xl font-bold text-snow bg-lila hover:bg-burnt rounded-t-lg mr-1 transition-colors duration-200 w-1/5 text-center"
          >
            {tab.name}
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-lila transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
          </a>
        ))}
      </div>
    )
  }