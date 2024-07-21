import { z } from 'zod';

export const UpdateUserProfileSchema = z.object({
    first_name: z.string().trim()
        .max(50, { message: 'First name cannot exceed 50 characters in length' })
        .regex(/^[a-zA-Z\s'-]+$/, { message: 'First name can only contain letters, spaces, hyphens, and apostrophes' })
        .transform(name => name.replace(/\s+/g, ' '))
        .transform(name => name.charAt(0).toUpperCase() + name.slice(1))
        .refine(name => name.trim().length > 0, { message: 'First name cannot be just whitespace' }).optional(),

    last_name: z.string().trim()
        .max(50, { message: 'Last name cannot exceed 50 characters in length' })
        .regex(/^[a-zA-Z\s'-]+$/, { message: 'Last name can only contain letters, spaces, hyphens, and apostrophes' })
        .transform(name => name.replace(/\s+/g, ' '))
        .transform(name => name.charAt(0).toUpperCase() + name.slice(1))
        .refine(name => name.trim().length > 0, { message: 'Last name cannot be just whitespace' }).optional(),

    username: z.string().trim()
        .max(50, { message: 'Username cannot exceed 50 characters in length' })
        .regex(/^[a-zA-Z][a-zA-Z0-9-_]{0,49}$/, { message: 'Username must start with a letter and can only contain letters, numbers, hyphens, and underscores' })
        .refine(name => name.trim().length > 0, { message: 'Username cannot be just whitespace' }).optional(),

    email: z.string().trim()
        .max(255, { message: 'Email address cannot exceed 255 characters in length' })
        .email({ message: 'Invalid email address' }).optional(),

    bio: z.string().trim()
    .max(1000, { message: 'Bio cannot exceed 1000 characters in length' }),

    profile_image: z.string().trim().optional()
});

export type UpdateUserProfileSchema = z.infer<typeof UpdateUserProfileSchema>;
