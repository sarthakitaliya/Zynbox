import express, { Router } from "express";

const router: Router = express.Router();

// Get all custom categories for the user
router.get("/")

// Create a new custom category
router.post("/");

// Update an existing custom category
router.put("/:categoryId");

// Delete a custom category
router.delete("/:categoryId");

export default router;
