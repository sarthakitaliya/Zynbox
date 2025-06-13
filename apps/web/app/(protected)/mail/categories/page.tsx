"use client";
import { CreateCategoryModal } from "@/components/mail/CreateCategoryModal";
import { useCategoryStore } from "@repo/store";
import { useEffect, useState } from "react";



export default function CategoriesPage() {
  const { fetchCategories, categories, createCategory } = useCategoryStore();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      await fetchCategories();
    };
    loadCategories();
  }, [fetchCategories]);

  const handleCreateCategory = async (name: string, description: string) => {
    await createCategory({ name, description });
  };

  if (!categories || categories.length === 0) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Categories</h2>
        <p className="text-gray-700">No categories found.</p>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Create Category
        </button>
        <CreateCategoryModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="p-5 m-5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Categories</h2>
          <p className="text-gray-500 mb-4">
            Here are your custom categories. You can use these to organize your
            emails.
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Create Category
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold capitalize text-gray-800 dark:text-gray-100">
              {category.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 whitespace-pre-line">
              {category.description}
            </p>
          </div>
        ))}
      </div>
      <CreateCategoryModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
