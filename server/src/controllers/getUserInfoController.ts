import { Request, response, Response } from 'express';
import { get } from 'mongoose';
import { IAPIResponse } from '../types/IApiResponse';
import { User } from '../models/User';

const getUserInfoController = async (req: Request, res: Response) => {

    try {

        // Get the user id from the url
        const { userId } = req.params;

        // Try and find a user with that id
        const user = await User.findById(userId);

        // If no user is found respond with 404
        if(!user) {

            const response: IAPIResponse = { message: 'User Not Found', code: 404 };
            res.status(response.code).json(response);
            return;

        }

        // Return the user profile info
        const response: IAPIResponse = {
            message: 'User Profile Retrieved',
            code: 200,
            data: {
                first_name: user.first_name,
                last_name: user.last_name,
                username: user.username,
                email: user.email,
                bio: user.bio,
                profile_image: user.profile_image,
                created_at: user.created_at
            }
        };

        res.status(response.code).json(response);
        return;

    }

    catch(error) {

        console.log(`Get User Info Error: ${error}`);

        // Send error response
        const response: IAPIResponse = { message: 'Internal Server Error', code: 500 };
        res.status(response.code).json(response);
        return;

    }

};

export default getUserInfoController;