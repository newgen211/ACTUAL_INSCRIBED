import { Request, Response } from 'express';
import { User } from '../../models/User';
import { IAPIResponse } from '../../types/IApiResponse';
import { Follow } from '../../models/Follow';

const getFollowingController = async (req: Request, res: Response) => {

    try {

        // Get the userId from the URL
        const { userId } = req.params;

        // Check if the user exists
        const user = await User.findById(userId);

        // If the user is not found, return a 404
        if (!user) {
            const response: IAPIResponse = { message: 'User not found', code: 404 };
            res.status(response.code).json(response);
            return;
        }

        // Find all the users the specified user is following
        const following = await Follow.find({ follower: userId }).populate('following', 'username');

        // Count the number of followers
        const numberOfFollowing= following.length;

        // Return a success message and the following users
        const response: IAPIResponse = { message: 'Following users retrieved successfully', code: 200, data: { numberOfFollowing, following } };
        res.status(response.code).json(response);
        return;

    }

    catch(error) {

        console.log(`Get Following Error: ${error}`);

        // Send error response
        const response: IAPIResponse = { message: 'Internal Server Error', code: 500 };
        res.status(response.code).json(response);
        return;

    }

};

export default getFollowingController;