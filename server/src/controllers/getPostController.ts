import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Post } from '../models/Post';
import { IAPIResponse } from '../types/IApiResponse';

const getPostController = async (req: Request, res: Response) => {
    try {
        const { postId } = req.params;

        // Convert postId to ObjectId
        const postObjectId = new mongoose.Types.ObjectId(postId);

        // Aggregation pipeline to retrieve the post with the desired details
        const post = await Post.aggregate([
            { $match: { _id: postObjectId } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            { $unwind: '$user' },
            {
                $lookup: {
                    from: 'likes',
                    localField: '_id',
                    foreignField: 'post',
                    as: 'likes'
                }
            },
            {
                $project: {
                    content: 1,
                    media: 1,
                    username: '$user.username',
                    likesCount: { $size: '$likes' },
                    created_at: 1,
                    updated_at: 1
                }
            }
        ]);

        // Check if the post was found
        if (!post.length) {

            const response: IAPIResponse = { message: 'Post not found', code: 404 };
            res.status(response.code).json(response);
            return;

        }

        // Return a success response with the post details
        const response: IAPIResponse = {
            message: 'Post retrieved successfully',
            code: 200,
            data: post[0],
        };

        res.status(response.code).json(response);
        return;

    } 
    
    catch (error) {

        console.log(`Get Post Error: ${error}`);

        // Send error response
        const response: IAPIResponse = { message: 'Internal Server Error', code: 500 };
        res.status(response.code).json(response);
        return;
        
    }
};

export default getPostController;
