import { model, Schema } from 'mongoose';
import { IUser } from '../types/IUser';


const userSchema = new Schema<IUser>({

    first_name: { 
        type: String, 
        required: true
    },

    last_name: {
        type: String, 
        required: true
    },

    username: { 
        type: String, 
        required: true, 
        unique: true 
    },

    email: { 
        type: String, 
        required: true, 
        unique: true 
    },

    password: { 
        type: String, 
        required: true },

    bio: { 
        type: String 
    },

    profile_image: { 
        type: String 
    },

    created_at: {
        type: Date,
        default: Date.now
    },

    last_login: {
        type: Date,
        default: Date.now
    },

    login_attempts: {
        type: Number,
        default: 0
    },

    account_locked: {
        type: Boolean,
        default: false
    },

    account_verified: {
        type: Boolean,
        default: false
    }

});

export const User = model<IUser>('User', userSchema);