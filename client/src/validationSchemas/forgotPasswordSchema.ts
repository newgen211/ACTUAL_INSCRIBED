import { z } from 'zod';

export const ForgotPasswordSchema = z.object({

    email: z.string().trim()
        .min(1, { message: 'Email address is required' })
        .max(255, { message: 'Email address cannot exceed 255 characters in length' })
        .email({ message: 'Invalid email address' }),

});

export type ForgotPasswordSchema = z.infer<typeof ForgotPasswordSchema>;