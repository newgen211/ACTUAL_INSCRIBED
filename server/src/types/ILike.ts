import { Document, Schema } from 'mongoose';

export interface ILike extends Document {
    user: Schema.Types.ObjectId;
    post: Schema.Types.ObjectId;
    created_at: Date;
}