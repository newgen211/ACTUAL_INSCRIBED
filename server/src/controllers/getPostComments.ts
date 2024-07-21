import { Request, Response } from 'express';
import { Comment } from '../models/Comment';
import { IAPIResponse } from '../types/IApiResponse';


const getPostComments = async (req: Request, res: Response) => {

    try {

        const { postId } = req.params;
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        // Calculate the skip value for pagination
        const skip = (page - 1) * limit;

        // Find the comments for the post with pagination
        const comments = await Comment.find({ post: postId })
            .sort({ created_at: -1 }) // Sort by creation date descending
            .skip(skip)
            .limit(limit)
            .populate('user', 'username');

        // Get the total count of comments for the post
        const totalComments = await Comment.countDocuments({ post: postId });

        // Return a success response with comments and pagination info
        const response: IAPIResponse = {
            message: 'Post comments retrieved successfully',
            code: 200,
            data: {
                comments,
                pagination: {
                    total: totalComments,
                    page,
                    pages: Math.ceil(totalComments / limit),
                },
            },
        };

        res.status(response.code).json(response);
        return;

    }

    catch(error) {

        console.log(`Get Post Comments Error: ${error}`);

        // Send error response
        const response: IAPIResponse = { message: 'Internal Server Error', code: 500 };
        res.status(response.code).json(response);
        return;

    }

};

export default getPostComments;