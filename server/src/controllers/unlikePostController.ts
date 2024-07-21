import { Request, Response } from 'express';
import { IAPIResponse } from '../types/IApiResponse';
import { Post } from '../models/Post';
import { Like } from '../models/Like';

const unlikePostController = async (req: Request, res: Response) => {

    try {

        const { postId } = req.params;

        // Check if the post exists
        const post = await Post.findById(postId);

        if (!post) {
            const response: IAPIResponse = { message: 'Post not found', code: 404 };
            res.status(response.code).json(response);
            return;
        }

        // Check if the user has liked the post
        const likedPost = await Like.findOne({ user: req.user.userId, post: postId });

        if (!likedPost) {

            const response: IAPIResponse = { message: 'User has not liked this post', code: 409 };
            res.status(response.code).json(response);
            return;

        }

        // Unlike the post
        await Like.deleteOne({ _id: likedPost._id });

        // Return a success response
        const response: IAPIResponse = { message: 'Post unliked successfully', code: 200 };
        res.status(response.code).json(response);
        return;


    }

    catch(error) {

        console.log(`Unlike Post Error: ${error}`);

        // Send error response
        const response: IAPIResponse = { message: 'Internal Server Error', code: 500 };
        res.status(response.code).json(response);
        return;

    }

};

export default unlikePostController;