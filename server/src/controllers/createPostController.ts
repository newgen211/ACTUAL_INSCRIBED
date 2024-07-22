import { Request, Response } from 'express';
import { Post } from '../models/Post';
import { IAPIResponse } from '../types/IApiResponse';

const createPostController = async (req: Request, res: Response) => {

    try {

        const { content, media } = req.body;

        // Create the new post
        const post = new Post({ user: req.user.userId, content, media });
        await post.save();

        // Return a success response
        const response: IAPIResponse = { message: 'Post created successfully', code: 201, data: post };
        res.status(response.code).json(response);
        return;

    }

    catch(error) {

        console.log(`Create Post Error: ${error}`);

        // Send error response
        const response: IAPIResponse = { message: 'Internal Server Error', code: 500 };
        res.status(response.code).json(response);
        return;

    }

};

export default createPostController;