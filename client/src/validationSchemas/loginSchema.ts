import { z } from 'zod';

export const LoginSchema = z.object({

    username: z.string().trim()
        .min(1, { message: 'Username required' })
        .max(50, { message: 'Username cannot exceed 50 characters in length' })
        .regex(/^[a-zA-Z][a-zA-Z0-9-_]{0,49}$/, { message: 'Username must start with a letter and can only contain letters, numbers, hypens, and underscores' })
        .refine((name) => name.trim().length > 0, { message: 'Username cannot be just whitespace' }),

    password: z.string().trim()
        .min(1, { message: 'Password is required' })

});

export type LoginSchema = z.infer<typeof LoginSchema>;