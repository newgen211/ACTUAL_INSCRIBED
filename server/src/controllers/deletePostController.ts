import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Post } from '../models/Post';
import { IAPIResponse } from '../types/IApiResponse';

const deletePostController = async (req: Request, res: Response) => {

    try {

        const { postId } = req.params;
        
        // Convert postId to ObjectId
        const postObjectId = new mongoose.Types.ObjectId(postId);

        // Find the post to delete
        const post = await Post.findById(postObjectId);

        // Return a 404 if the post is not found
        if (!post) {

            const response: IAPIResponse = { message: 'Post not found', code: 404 };
            res.status(response.code).json(response);
            return;

        }

        // Check if the user is the owner of the post
        if (post.user.toString() !== req.user.userId) {

            const response: IAPIResponse = { message: 'Unauthorized to delete this post', code: 403 };
            res.status(response.code).json(response);
            return;

        }

        // Delete the post
        await Post.deleteOne({ _id: postObjectId });

        // Return a success response
        const response: IAPIResponse = { message: 'Post deleted successfully', code: 200 };
        res.status(response.code).json(response);
        return;

    }

    catch(error) {

        console.log(`Delete Post Error: ${error}`);

        // Send error response
        const response: IAPIResponse = { message: 'Internal Server Error', code: 500 };
        res.status(response.code).json(response);
        return;

    }

};

export default deletePostController;