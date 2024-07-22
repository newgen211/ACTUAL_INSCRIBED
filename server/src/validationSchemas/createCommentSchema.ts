import { z } from 'zod';

export const CreateCommentSchema = z.object({
    content: z.string().nonempty({ message: 'Content is required' }).max(500, 'Content cannot exceed 500 characters')
});

export type CreateCommentSchema = z.infer<typeof CreateCommentSchema>;