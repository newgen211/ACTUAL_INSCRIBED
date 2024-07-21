import { Request, Response } from 'express';
import { Post } from '../models/Post';
import { IAPIResponse } from '../types/IApiResponse';

const getDiscoverFeedController = async (req: Request, res: Response) => {

    try {

        // Pagination parameters
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        // Fetch posts with pagination
        const posts = await Post.find({})
            .sort({ created_at: -1 })
            .skip(skip)
            .limit(limit)
            .populate('user', 'username profile_image')
            .lean();

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
        res.send(response.code).json(response);
        return;

    }

};

export default getDiscoverFeedController;