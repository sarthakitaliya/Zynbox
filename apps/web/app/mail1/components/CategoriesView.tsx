import React from 'react';
import CategoryCard from './CategoryCard'; // Import the CategoryCard component

// Dummy category data
const dummyCategories = [
  {
    id: '1',
    name: 'Security',
    description: 'Security alerts and notifications',
    emailCount: 2,
    isDefault: true,
    color: 'red',
  },
  {
    id: '2',
    name: 'Updates',
    description: 'Product updates and notifications',
    emailCount: 5,
    isDefault: true,
    color: 'green',
  },
  {
    id: '3',
    name: 'Promotions',
    description: 'Marketing and promotional emails',
    emailCount: 10,
    isDefault: false,
    color: 'yellow',
  },
  {
    id: '4',
    name: 'Social',
    description: 'Social media notifications',
    emailCount: 7,
    isDefault: false,
    color: 'blue',
  },
  {
    id: '5',
    name: 'Forums',
    description: 'Forum discussions and replies',
    emailCount: 3,
    isDefault: false,
    color: 'purple',
  },
];

const CategoriesView: React.FC = () => {
  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-100">Categories</h2>
          <p className="text-gray-400">Manage your email categories and labels</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
          + Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyCategories.map(category => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CategoriesView; 