import { z } from 'zod';

export const ResetPasswordSchema = z.object({

    password: z.string().trim()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&_-]{8,}$/, { message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character and be at least 8 characters long' })
        .min(8, { message: 'Password must be at least charracters long' })
        .max(64, { message: 'Password cannot exceed 64 characters in length' }),

    confirm_password: z.string().trim()
        .max(64, { message: 'Confirm password cannot exceed 64 characters in length' }),

    

}).refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
});

export type ResetPasswordSchema = z.infer<typeof ResetPasswordSchema>;