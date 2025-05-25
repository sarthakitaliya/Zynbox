import { prismaClient } from "@repo/db/client";

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

export const create_category = async (id: string, name: string, description?: string) => {
  try {
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
