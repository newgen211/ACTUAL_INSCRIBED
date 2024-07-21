import { model, Schema } from 'mongoose';
import { IComment } from '../types/IComment';

const commentSchema = new Schema<IComment>({

    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },

    post: { 
        type: Schema.Types.ObjectId, 
        ref: 'Post', 
        required: true 
    },

    content: { 
        type: String, 
        required: true 
    },

    created_at: {
        type: Date,
        default: Date.now
    },

    updated_at: {
        type: Date,
        default: Date.now
    }

});

export const Comment = model<IComment>('Comment', commentSchema);
