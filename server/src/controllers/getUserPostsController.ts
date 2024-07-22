import { Request, Response } from 'express';
import { Post } from '../models/Post';
import { IAPIResponse } from '../types/IApiResponse';
import mongoose from 'mongoose';

const getUserPostsController = async (req: Request, res: Response) => {

    try {

        const { userId } = req.params;
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        // Calculate the skip value for pagination
        const skip = (page - 1) * limit;

        // Convert userId to ObjectId
        const userObjectId = new mongoose.Types.ObjectId(userId);

        // Aggregation pipeline
        const posts = await Post.aggregate([
            { $match: { user: userObjectId } },
            { $sort: { created_at: -1 } },
            { $skip: skip },
            { $limit: limit },
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
                    username: '$user.username',
                    likesCount: { $size: '$likes' },
                    created_at: 1,
                    updated_at: 1
                }
            }
        ]);

        // Get the total count of posts
        const totalPosts = await Post.countDocuments({ user: userId });

        // Return a success response with posts and pagination info
        const response: IAPIResponse = {
            message: 'User posts retrieved successfully',
            code: 200,
            data: {
                posts,
                pagination: {
                    total: totalPosts,
                    page,
                    pages: Math.ceil(totalPosts / limit),
                },
            },
        };
        
        res.status(response.code).json(response);
        return;


    }

    catch(error) {

        console.log(`Get User Posts Error: ${error}`);

        // Send error response
        const response: IAPIResponse = { message: 'Internal Server Error', code: 500 };
        res.status(response.code).json(response);

    }

};

export default getUserPostsController;