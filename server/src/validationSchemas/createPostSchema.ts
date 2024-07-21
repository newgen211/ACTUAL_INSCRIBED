import { z } from 'zod';

export const CreatePostSchema = z.object({
    content: z.string().nonempty({ message: 'Content is required' }).max(500, 'Content cannot exceed 500 characters'),
    media: z.string().url('Media must be a valid URL').optional()
});

export type CreatePostSchema = z.infer<typeof CreatePostSchema>;