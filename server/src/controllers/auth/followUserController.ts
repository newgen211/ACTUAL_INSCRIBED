import { Request, Response } from 'express';
import { IAPIResponse } from '../../types/IApiResponse';
import { User } from '../../models/User';
import { Follow } from '../../models/Follow';

const followUserController = async (req: Request, res: Response) => {

    try {

        // Get the id of the user we are trying to follow
        const { userId } = req.params;

        // Make sure the user is not trying to follow themselves
        if(userId === req.user.userId) {

            const response: IAPIResponse = { message: 'You cannot follow yourself', code: 400 };
            res.status(response.code).json(response);
            return;

        }

        // Make sure the id they are attempting to follow exists
        const userToFollow = await User.findById(userId);

        // If the user does not exists return a 404 response
        if(!userToFollow) {

            const response: IAPIResponse = { message: 'User to follow not found', code: 404 };
            res.status(response.code).json(response);
            return;

        }

        // Check if the user is already following this user
        const alreadyFollowing = await Follow.findOne( { follower: req.user.userId, following: userId } );

        // If the user is already following the user return a 409
        if(alreadyFollowing) {

            const response: IAPIResponse = { message: 'Already following user', code: 409 };
            res.status(response.code).json(response);
            return;

        }

        // Create the new follow relationship
        const follow = new Follow({ follower: req.user.userId, following: userId });
        await follow.save();

        // Return a success response
        const response: IAPIResponse = { message: 'Successfully followed the user', code: 200, data: follow };
        res.status(response.code).json(response);
        return;

    }

    catch(error) {

        console.log(`Follow User Error: ${error}`);

        // Send error response
        const response: IAPIResponse = { message: 'Internal Server Error', code: 500 };
        res.status(response.code).json(response);
        return;

    }

};

export default followUserController;