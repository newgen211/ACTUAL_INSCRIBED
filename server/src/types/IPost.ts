import { Document, Schema } from 'mongoose';

export interface IPost extends Document {
    user: Schema.Types.ObjectId;
    content: string;
    media?: string;
    likes: Schema.Types.ObjectId[];
    comments: Schema.Types.ObjectId[];
    created_at: Date;
    updated_at: Date;
}