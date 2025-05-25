import { Request, Response } from "express";
import {create_category, delete_category, get_categories, update_category} from "../services/categories.service";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await get_categories(req.user.id);
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
}
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Category name is required" });
    }

    const category = await create_category(req.user.id, name, description);
    res.status(201).json(category);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Failed to create category" });
  }
}
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    const { name, description } = req.body;

    const category = await update_category(req.user.id, categoryId as string, name, description);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(category);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: "Failed to update category" });
  }
};
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;

    const deleted = await delete_category(req.user.id, categoryId as string);
    if (!deleted) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Failed to delete category" });
  }
};