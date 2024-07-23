import { Request, Response } from 'express';
import { Post } from '../models/Post';
import { IAPIResponse } from '../types/IApiResponse';
import mongoose from 'mongoose';

interface AuthenticatedRequest extends Request {
    userId?: string;
}

const getDiscoverFeedController = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const authenticatedUserId = req.userId;

        // Pagination parameters
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        // Fetch posts with pagination and add isOwnedByUser field
        const posts = await Post.aggregate([
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
                $project: {
                    content: 1,
                    created_at: 1,
                    updated_at: 1,
                    'user._id': 1,
                    'user.username': 1,
                    'user.profile_image': 1,
                    isOwnedByUser: {
                        $eq: ['$user._id', authenticatedUserId ? new mongoose.Types.ObjectId(authenticatedUserId) : null]
                    }
                }
            }
        ]);

        // Get the total count of posts
        const totalPosts = await Post.countDocuments();

        // send success message and posts to user
        const response: IAPIResponse = { 
            message: 'Discover Feed Fetched', 
            code: 200,
            data: {
                posts,
                currentPage: page,
                totalPages: Math.ceil(totalPosts / limit),
                totalPosts
            } 
        };

        res.status(response.code).json(response);
        return;
    }
    catch(error) {
        console.error(`Error Getting Discover Feed: ${error}`);

        const response: IAPIResponse = { message: 'Internal Server Error', code: 500  };
        res.status(response.code).json(response);
        return;
    }
};

export default getDiscoverFeedController;