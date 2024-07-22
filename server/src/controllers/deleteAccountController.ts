import { Request, Response } from 'express';
import { User } from '../models/User';
import { IAPIResponse } from '../types/IApiResponse';
import { Like } from '../models/Like';
import { Post } from '../models/Post';
import { Comment } from '../models/Comment';


const deleteAccountController = async (req: Request, res: Response) => {

    try {

        // Find the user to delete
        const user = await User.findById(req.user.userId);
        
        // Return a 404 if the user is not found
        if (!user) {
            const response: IAPIResponse = { message: 'User not found', code: 404 };
            res.status(response.code).json(response);
            return;
        }

        // Delete the user
        await User.deleteOne({ _id: req.user.userId });

        // Delete all posts created by the user
        await Post.deleteMany({ user: req.user.userId });

        // Delete all likes made by the user
        await Like.deleteMany({ user: req.user.userId });

        // Delete all comments made by the user
        await Comment.deleteMany({ user: req.user.userId });

        // Return a success response
        const response: IAPIResponse = { message: 'User account and associated data deleted successfully', code: 200 };
        res.status(response.code).json(response);
        return;

    }

    catch(error) {

        console.error(`Delete Account Error: ${error}`);

        // Send error response
        const response: IAPIResponse = { message: 'Internal Server Error', code: 500 };
        res.status(response.code).json(response);

    }

};

export default deleteAccountController;