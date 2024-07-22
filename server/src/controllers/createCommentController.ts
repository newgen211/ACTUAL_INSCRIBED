import { Request, Response } from 'express';
import { Post } from '../models/Post';
import { IAPIResponse } from '../types/IApiResponse';
import mongoose from 'mongoose';
import { Comment } from '../models/Comment';


const createCommentController = async (req: Request, res: Response) => {

    try {

        const { content } = req.body;
        const { postId } = req.params;

        // Check if the post exists
        const post = await Post.findById(postId);
        
        if (!post) {
            const response: IAPIResponse = { message: 'Post not found', code: 404 };
            res.status(response.code).json(response);
            return;
        }

        // Create a new comment
        const comment = new Comment({ user: req.user.userId, post: postId, content });
        await comment.save();

        // Return a success response
        const response: IAPIResponse = { message: 'Comment created successfully', code: 201, data: comment };
        res.status(response.code).json(response);
        return;

    }

    catch(error) {

        console.log(`Create Comment Error: ${error}`);

        // Send error response
        const response: IAPIResponse = { message: 'Internal Server Error', code: 500 };
        res.status(response.code).json(response);
        return;

    }

};

export default createCommentController;