import React from "react";
import { Home,Heart,StarsIcon } from "lucide-react";

const Sidebar = () => {
  const data = [
    { title: "Home", icon:<Home/> },
    { title: "Trending", icon: <StarsIcon/> },
    { title: "Favorites", icon:<Heart/> },
  ];

  return (
    <div className="w-[20%] h-lvh bg-zinc-900 hidden sm:block text-white p-4 fixed ">
      <h2 className="text-xl font-bold mb-4">Sidebar</h2>
      <ul className="space-y-2 ">
        {data.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-3 py-2 px-3 rounded-md  cursor-pointer hover:bg-zinc-700"
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-base hidden md:block ">{item.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
