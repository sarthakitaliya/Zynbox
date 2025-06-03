import { Funnel, ListFilter, Menu, RefreshCcw, Search } from "lucide-react";
import Toggle from "./Toggle";

export const MailNavbar = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between p-5 border-b border-[#3f3f3f7a]">
        <div className="cursor-pointer">
          <Menu size={17} className="text-gray-400" />
        </div>
        <div className="flex space-x-4">
          <Toggle />
          <div className="border-l border-[#75757562]"></div>
          <RefreshCcw className="cursor-pointer text-gray-400" size={17} />
        </div>
      </div>
      <div className="flex items-center gap-0.5 self-center px-1 text-sm">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={15}
          />
          <input
            type="text"
            placeholder="Search emails..."
            className="w-[22vw] pl-10 pr-3 py-1.5 rounded-md bg-[#141414] text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-600"
          />
        </div>
        <div className="relative flex items-center">
          <ListFilter
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={15}
          />
          <select className="pl-10 pr-3 py-1.5 rounded-md bg-[#141414] text-gray-200 appearance-none focus:outline-none cursor-pointer">
            <option value="">All Categories</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="promotions">Promotions</option>
            <option value="important">Important</option>
          </select>
        </div>
      </div>
    </div>
  );
};
