import { Request, Response, NextFunction } from "express";
import { create_category, delete_category, get_categories, update_category } from "../services/categories.service";
import { ValidationError, NotFoundError } from "../utils/errors";

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await get_categories(req.user.id);
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description } = req.body;
    
    if (!name) {
      throw new ValidationError("Category name is required");
    }

    const category = await create_category(req.user.id, name, description);
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { categoryId } = req.params;
    const { name, description } = req.body;

    if (!categoryId) {
      throw new ValidationError("Category ID is required");
    }

    if (!name) {
      throw new ValidationError("Category name is required");
    }

    const category = await update_category(req.user.id, categoryId, name, description);
    if (!category) {
      throw new NotFoundError("Category not found");
    }

    res.json(category);
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { categoryId } = req.params;
    
    if (!categoryId) {
      throw new ValidationError("Category ID is required");
    }

    const deleted = await delete_category(req.user.id, categoryId);
    if (!deleted) {
      throw new NotFoundError("Category not found");
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};