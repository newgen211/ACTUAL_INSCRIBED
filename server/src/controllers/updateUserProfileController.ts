import { Request, Response } from 'express';
import { User } from '../models/User';
import { IAPIResponse } from '../types/IApiResponse';

const updateUserProfileController = async (req: Request, res: Response) => {

    try {

        // Get the updated info from the body
        const { first_name, last_name, username, email, bio, profile_image } = req.body;

        // Find the user document
        const user = await User.findById(req.user.userId);

        // If no user is found respond with a 404
        if(!user) {

            const response: IAPIResponse = { message: 'User not found', code: 404 };
            res.status(response.code).json(response);
            return;

        }

        /* Check to see if the new username and/or email is avaliable */
        if ((username !== undefined && username !== user.username) || (email !== undefined && email !== user.email)) {

            const findUser = await User.findOne({ $or: [{username}, {email}] });

            if(findUser) {

                const response: IAPIResponse = { message: 'User Conflict Error', code: 409, errors: [] };

                if(findUser.email === email) response.errors?.push({ field: 'email', message: 'Email taken' });
                if(findUser.username === username) response.errors?.push({field: 'username', message: 'Username taken'});

                // return error response
                res.status(response.code).json(response);
                return;

            }

        }

        // If the email is changing set the verifed state to be false again
        if(email !== undefined && email !== user.email) {
            user.account_verified =false;
        }

        // Update the user's info
        if (first_name !== undefined) user.first_name = first_name;
        if (last_name !== undefined) user.last_name = last_name;
        if (username !== undefined) user.username = username;
        if (email !== undefined) user.email = email;
        if (bio !== undefined) user.bio = bio;
        if (profile_image !== undefined) user.profile_image = profile_image;

        await user.save();

        // Return a success response
        const response: IAPIResponse = { message: 'User profile updated successfully', code: 200, data: user };
        res.status(response.code).json(response);
        return;

    }

    catch(error) {

        console.log(`Update User Info Error: ${error}`);

        // Send error response
        const response: IAPIResponse = { message: 'Internal Server Error', code: 500 };
        res.status(response.code).json(response);
        return;

    }

};

export default updateUserProfileController;