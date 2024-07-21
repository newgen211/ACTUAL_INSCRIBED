import * as argon2 from 'argon2';
import { Request, Response } from 'express';
import { User } from '../../models/User';
import { IAPIResponse } from '../../types/IApiResponse';
import { createAccessToken } from '../../utils/createTokens';

const loginController = async (req: Request, res: Response) => {

    try {

        // Get the username and password from the request body
        const { username, password } = req.body;
        
        // Find the user by username
        const user = await User.findOne({ username });

        // If no user is found respond with invalid login credentials
        if(!user) {

            const response: IAPIResponse = { message: 'Invalid username or password', code: 401 };
            res.status(response.code).json(response);
            return;

        }

        // Verify the password provided matches the password on file
        const passwordMatch = await argon2.verify(user.password, password);

        // If the passwords do not match, update login attempts and respond with invalid crendentials error
        if(!passwordMatch) {

            // Increment the login attempts
            user.login_attempts++;

            // Check how many times the user has tried
            if(user.login_attempts > 5) user.account_locked = true;

            await user.save();
            
            // Respond with error
            const response: IAPIResponse = { message: 'Invalid username or password', code: 401 };
            res.status(response.code).json(response);
            return;

        }

        // Check if the account is verified
        if(!user.account_verified) {

            const response: IAPIResponse = { message: 'Account Not Verifed', code: 403 };
            res.status(response.code).json(response);
            return;

        }

        // Check if the account is locked from to many login attempts
        if(user.account_locked) {

            const response: IAPIResponse = { message: 'Too many login attempts. Reset Your Password.', code: 403 };
            res.status(response.code).json(response);
            return;

        }

        // Genetate a user access token
        const token = createAccessToken(user.id);

        // Send success response with the access token
        const response: IAPIResponse = { message: 'Login Successful', code: 200, token };
        res.status(response.code).json(response);
        return;

    }

    catch(error) {

        console.error(`Login Error: ${error}`);

        const response: IAPIResponse = { message: 'Internal Server Error', code: 500 };
        res.status(response.code).json(response);
        return;

    }

};

export default loginController;