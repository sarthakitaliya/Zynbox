import { api } from "./axiosInstance.ts";
import axios, { AxiosError } from "axios";

interface Category {
  id: string;
  name: string;
  description?: string;
  userId: string;
}

interface CategoryInput {
  name: string;
  description?: string;
}


const handleError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const msg = error.response?.data?.message || error.message;
    throw new Error(msg || "Something went wrong while making the request.");
  }
  throw error instanceof Error ? error : new Error("An unexpected error occurred.");
};

const validateCategory = (category: CategoryInput): void => {
  if (!category.name || category.name.trim() === "") {
    throw new Error("Category name is required");
  }
  if (category.description && category.description.length > 100) {
    throw new Error("Description cannot exceed 100 characters");
  }
};

const validateCategories = (categories: CategoryInput[]): void => {
  if (!Array.isArray(categories)) {
    throw new Error("Categories must be an array");
  }
  if (categories.length === 0) {
    throw new Error("At least one category is required");
  }
  if (categories.length > 4) {
    throw new Error("Cannot create more than 4 categories at once");
  }
  categories.forEach(validateCategory);
};

const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await api.get<Category[]>("/categories");
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

const createCategory = async (category: CategoryInput): Promise<Category> => {
  validateCategory(category);

  try {
    const response = await api.post<Category>("/categories", category);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
}

const createCategories = async (categories: CategoryInput[]): Promise<Category[]> => {
  validateCategories(categories);

  try {
    const response = await api.post<Category[]>("/categories/bulk", { categories });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

const updateCategory = async (categoryId: string, category: CategoryInput): Promise<Category> => {
  if (!categoryId) {
    throw new Error("Category ID is required");
  }
  validateCategory(category);

  try {
    const response = await api.put<Category>(`/categories/${categoryId}`, category);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
}

const deleteCategory = async (categoryId: string): Promise<void> => {
  if (!categoryId) {
    throw new Error("Category ID is required");
  }

  try {
    await api.delete(`/categories/${categoryId}`);
  } catch (error) {
    handleError(error);
  }
}

export const apiCategory = {
  getCategories,
  createCategory,
  createCategories,
  updateCategory,
  deleteCategory,
};