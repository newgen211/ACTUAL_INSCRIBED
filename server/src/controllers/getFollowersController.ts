import { Request, Response } from 'express';
import { User } from '../models/User';
import { IAPIResponse } from '../types/IApiResponse';
import { Follow } from '../models/Follow';

const getFollowersController = async (req: Request, res: Response) => {

    try {

        // Get the userId from the url
        const { userId } = req.params;

        // Check if the user exists
        const user = await User.findById(userId);

        // If the user is not found return a 404
        if(!user) {

            const response: IAPIResponse = { message: 'User not found', code: 404 };
            res.status(response.code).json(response);
            return;

        }

        // Find all the followers of the user
        const followers = await Follow.find({ following: userId }).populate('follower', 'username');

        // Return a success message and the followers
        const response: IAPIResponse = { message: 'Followers retrieved successfully', code: 200, data: followers };
        res.status(response.code).json(response);
        return;

    }

    catch(error) {

        console.log(`Get Followers Error: ${error}`);

        // Send error response
        const response: IAPIResponse = { message: 'Internal Server Error', code: 500 };
        res.status(response.code).json(response);
        return;

    }

};

export default getFollowersController;