import express, { Router } from "express";
import { createCategories, createCategory, deleteCategory, getCategories, updateCategory } from "../controllers/categories.controller";

const router: Router = express.Router();

// Get all custom categories for the user
router.get("/", getCategories);

// Create multiple categories
router.post("/bulk", createCategories);

// Create a new custom category
router.post("/", createCategory);

// Update an existing custom category
router.put("/:categoryId", updateCategory);

// Delete a custom category
router.delete("/:categoryId", deleteCategory);

export default router;
