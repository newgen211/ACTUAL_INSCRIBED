import * as argon2 from 'argon2';
import { Request, Response } from 'express';
import { IAPIResponse } from '../../types/IApiResponse';
import { IUser } from '../../types/IUser';
import { User } from '../../models/User';

const registerController = async (req: Request, res: Response) => {

    try {

        // Extract the register form data from the request
        const { first_name, last_name, username, email, password, confirm_password } = req.body;

        // Check if email and/or username are taken
        const findUser = await User.findOne({ $or: [{email}, {username}] });

        // If we found a user with one of those credentials return a conflict error
        if(findUser) {

            const response: IAPIResponse = { message: 'User Conflict Error', code: 409, errors: [] };

            if(findUser.email === email) response.errors?.push({ field: 'email', message: 'Email taken' });
            if(findUser.username === username) response.errors?.push({field: 'username', message: 'Username taken'});

            // return error response
            res.status(response.code).json(response);
            return;

        }

        // Hash the provided password using argon2
        const passwordHash: string = await argon2.hash(password);

        // Create a new user document
        const user: IUser = new User({ first_name, last_name, username, email, password: passwordHash });
        
        // Save the new user to the database
        await user.save();

        // Send a account created response
        const response: IAPIResponse = { message: 'Account Created Successfully', code: 201 };
        res.status(response.code).json(response);
        return;

    }

    catch(error){ 

        // Log the error
        console.log(`Registration Error: ${error}`);

        // Send error response
        const response: IAPIResponse = { message: 'Internal Server Error', code: 500 };
        res.status(response.code).json(response);
        return;

    }

};

export default registerController;