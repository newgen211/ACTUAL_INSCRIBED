import { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
    bio?: string;
    profile_image?: string;
    created_at: Date;
    last_login: Date;
    login_attempts: number;
    account_locked: boolean;
    account_verified: boolean;
}