import React from 'react';
import { BsTag, BsPencil } from 'react-icons/bs'; // Example icons

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    description?: string;
    emailCount: number;
    isDefault?: boolean;
    color?: string; // Optional color for the icon
  };
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col justify-between border border-gray-700 hover:border-blue-600 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {/* Category Icon with dynamic color */}
          <BsTag className={`mr-3 text-xl ${category.color ? `text-${category.color}-400` : 'text-blue-400'}`} />
          <h3 className="text-xl font-semibold text-gray-100">{category.name}</h3>
        </div>
        {/* Edit Icon */}
        <button className="text-gray-400 hover:text-gray-200">
          <BsPencil className="text-lg" />
        </button>
      </div>
      <p className="text-sm text-gray-400 mb-4 flex-grow">{category.description || 'No description'}</p>
      <div className="flex items-center justify-between mt-auto">
        <span className="text-sm px-3 py-1 rounded-full bg-gray-700 text-gray-200">{category.emailCount} emails</span>
        {category.isDefault && (
          <span className="text-sm px-3 py-1 rounded-full bg-blue-600 text-white">Default</span>
        )}
      </div>
    </div>
  );
};

export default CategoryCard; 