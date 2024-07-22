import { model, Schema } from 'mongoose';
import { ILike } from '../types/ILike';

const likeSchema = new Schema<ILike>({

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

    created_at: {
        type: Date,
        default: Date.now
    }

});

export const Like = model<ILike>('Like', likeSchema);
