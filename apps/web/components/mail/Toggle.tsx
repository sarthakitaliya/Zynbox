"use client";

import { useState } from "react";

export default function Toggle() {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => setIsOn(!isOn);

  return (
    <div
      className="flex items-center space-x-4 cursor-pointer select-none"
      onClick={handleToggle}
    >
      <button
        className={`relative w-6 h-4 rounded-full transition-colors duration-300 focus:outline-none cursor-pointer
          ${isOn ? "bg-green-400" : "bg-[#27272A]"}`}
      >
        <span
          className={`absolute left-0 top-0 h-4 w-4 bg-white rounded-full shadow-md transform transition-transform duration-300 
            ${isOn ? "translate-x-3" : ""}`}
        />
      </button>
      <span className="text-xs font-medium text-gray-400">Auto-categories</span>
    </div>
  );
}