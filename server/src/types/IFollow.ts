import { Document, Schema } from 'mongoose';

export interface IFollow extends Document {
    follower: Schema.Types.ObjectId;
    following: Schema.Types.ObjectId;
    created_at: Date;
}