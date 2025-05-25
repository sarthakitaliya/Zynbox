import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z.string().min(1, 'Category name is required').max(50, 'Category name is too long'),
  description: z.string().max(200, 'Description is too long').optional(),
});

export const updateCategorySchema = z.object({
  name: z.string().min(1, 'Category name is required').max(50, 'Category name is too long').optional(),
  description: z.string().max(200, 'Description is too long').optional(),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>; 