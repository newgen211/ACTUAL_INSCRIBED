import { Document, Schema } from 'mongoose';

export interface IComment extends Document {
    user: Schema.Types.ObjectId;
    post: Schema.Types.ObjectId;
    content: string;
    created_at: Date;
}