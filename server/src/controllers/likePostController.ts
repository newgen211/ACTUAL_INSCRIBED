import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Post } from '../models/Post';
import { IAPIResponse } from '../types/IApiResponse';
import { Like } from '../models/Like';

const likePostController = async (req: Request, res: Response) => {

    try {

        const { postId } = req.params;
        
        // Check if the post exists
        const post = await Post.findById(postId);

        if(!post) {

            const response: IAPIResponse = { message: 'Post not found', code: 404 };
            res.status(response.code).json(response);
            return;

        }

        // Check if the user has already liked the post
        const alreadyLiked = await Like.findOne({ user: req.user.userId, post: postId });

        if (alreadyLiked) {

            const response: IAPIResponse = { message: 'User has already liked this post', code: 409 };
            res.status(response.code).json(response);
            return;

        }

        // Create a new like
        const like = new Like({ user: req.user.userId, post: postId });
        await like.save();

        // Return a success response
        const response: IAPIResponse = { message: 'Post liked successfully', code: 200, data: like };
        res.status(response.code).json(response);
        return;

    }

    catch(error) {

        console.log(`Like Post Error: ${error}`);

        // Send error response
        const response: IAPIResponse = { message: 'Internal Server Error', code: 500 };
        res.status(response.code).json(response);
        return;

    }

};

export default likePostController;