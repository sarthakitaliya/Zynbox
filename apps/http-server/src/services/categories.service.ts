import { prismaClient } from "@repo/db/client";
import { CreateCategoryInput } from "../schemas/category.schema";

export const get_categories = async (id: string) => {
  try {
    const categories = await prismaClient.customCategory.findMany({
        where:{
            userId: id
        }
    })
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
}

export const check_categories = async (id: string) => {
  try {
    const count = await prismaClient.customCategory.count({
      where: {
        userId: id
      }
    });
    return count > 0;
  } catch (error) {
    console.error("Error checking categories:", error);
    throw new Error("Failed to check categories");
  }
}

export const create_category = async (id: string, name: string, description?: string) => {
  try {
    const count = await prismaClient.customCategory.count({
      where: {
        userId: id
      }
    });
    if (count >= 4) {
      throw new Error("You can only create up to 4 categories");
    }
    if (!name || name.trim() === "") {
      throw new Error("Category name is required");
    }
    if (description && description.length > 100) {
      throw new Error("Description cannot exceed 100 characters");
    }
    const category = await prismaClient.customCategory.create({
      data: {
        userId: id,
        name,
        description
      }
    });
    return category;
  } catch (error) {
    console.error("Error creating category:", error);
    throw new Error("Failed to create category");
  }
}

export const update_category = async (id: string, categoryId: string, name?: string, description?: string) => {
  try {
    if (!name || name.trim() === "") {
      throw new Error("Category name is required");
    }
    if (description && description.length > 100) {
      throw new Error("Description cannot exceed 100 characters");
    }
    const category = await prismaClient.customCategory.update({
      where: {
        id: categoryId,
        userId: id
      },
      data: {
        name,
        description
      }
    });
    return category;
  } catch (error) {
    console.error("Error updating category:", error);
    throw new Error("Failed to update category");
  }
}

export const delete_category = async (id: string, categoryId: string) => {
  try {
    const deleted = await prismaClient.customCategory.delete({
      where: {
        id: categoryId,
        userId: id
      }
    });
    return deleted;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw new Error("Failed to delete category");
  }
};

export const create_categories = async (userId: string, categories: CreateCategoryInput[]) => {
  try {
    const count = await prismaClient.customCategory.count({
      where: {
        userId
      }
    });

    if (count + categories.length > 4) {
      throw new Error("You can only have up to 4 categories");
    }

    const categoryData = categories.map(category => ({
      userId,
      name: category.name,
      description: category.description
    }));

    // Create categories one by one to get the full objects back
    const createdCategories = await Promise.all(
      categoryData.map(data => 
        prismaClient.customCategory.create({
          data
        })
      )
    );
    
    return createdCategories;
  } catch (error) {
    console.error("Error creating categories:", error);
    throw new Error("Failed to create categories");
  }
};
