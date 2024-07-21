import { Request, Response } from 'express';
import { IAPIResponse } from '../types/IApiResponse';
import { Follow } from '../models/Follow';

const unfollowUserController = async (req: Request, res: Response) => {

    try {

        // Get the id of the user we are trying to unfollow
        const { userId } = req.params;

        // Make sure the user is not trying to unfollow themselves
        if(userId === req.user.userId) {

            const response: IAPIResponse = { message: 'You cannot unfollow yourself', code: 400 };
            res.status(response.code).json(response);
            return;

        }

        // Check if the follow relationship exists
        const isFollowing = await Follow.findOne({ follower: req.user?.userId, following: userId });

        // If the follow relationship does not exist, return a 404 response
        if (!isFollowing) {
            const response: IAPIResponse = { message: 'Follow relationship not found', code: 404 };
            res.status(response.code).json(response);
            return;
        }

        // Remove the follow relationship
        await Follow.deleteOne({ _id: isFollowing._id });

        // Return a success response
        const response: IAPIResponse = { message: 'Successfully unfollowed the user', code: 200 };
        res.status(response.code).json(response);
        return;

    }

    catch(error) {

        console.log(`Unfollow User Error: ${error}`);

        // Send error response
        const response: IAPIResponse = { message: 'Internal Server Error', code: 500 };
        res.status(response.code).json(response);
        return;

    }

};

export default unfollowUserController;