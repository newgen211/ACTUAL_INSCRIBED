import { model, Schema } from 'mongoose';
import { IFollow } from '../types/IFollow';

const followSchema = new Schema<IFollow>({
    follower: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    following: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

export const Follow = model<IFollow>('Follow', followSchema);