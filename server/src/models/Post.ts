import { model, Schema } from 'mongoose';
import { IPost } from '../types/IPost';

const postSchema = new Schema<IPost>({

    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },

    content: { 
        type: String, 
        required: true 
    },

    media: { 
        type: String 
    },

    likes: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    }],

    comments: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Comment' 
    }],

    created_at: {
        type: Date,
        default: Date.now
    },

    updated_at: {
        type: Date,
        default: Date.now
    }

});

export const Post = model<IPost>('Post', postSchema);
