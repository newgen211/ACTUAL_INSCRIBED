import * as argon2 from 'argon2';
import { Request, Response } from 'express';
import { IAPIResponse } from '../../types/IApiResponse';
import jwt from 'jsonwebtoken';
import { User } from '../../models/User';

const resetPasswordController = async (req: Request, res: Response) => {

    try {

        // Get the and new password from the request body
        const { password } = req.body;

        // Get the reset token from the url
        const { token } = req.query;

        // If there is no token respond with an error
        if(!token || typeof token !== 'string') {

            const response: IAPIResponse = { message: 'Invalid or missing reset token', code: 400 };
            res.status(response.code).json(response);
            return;

        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.RESET_SECRET_KEY as string) as {userId: string};

        // Find the user by the id in the token
        const user = await User.findById(decoded.userId);

        // If no user is found return an error
        if(!user) {

            const response: IAPIResponse = { message: 'User Not Found', code: 404 };
            res.status(response.code).json(response);
            return;

        }

        // Hash the password
        const hashedPassword = await argon2.hash(password);

        // Update the user's password, account locked status, and login attempts
        user.password       = hashedPassword;
        user.account_locked = false;
        user.login_attempts = 0;
        await user.save();

        // Send success response
        const response: IAPIResponse = { message: 'Password reset successfully', code: 200 };
        res.status(response.code).json(response);
        return;

    }
    
    catch(error) {

        console.error(`Reset Password Error: ${error}`);

        // Handle JWT verification errors and other errors
        if (error instanceof jwt.JsonWebTokenError) {

            const response: IAPIResponse = { message: 'Invalid or expired token', code: 400 };
            res.status(response.code).json(response);
            return;
            
        }

        const response: IAPIResponse = { message: 'Internal Server Error', code: 500 };
        res.status(response.code).json(response);
        return;

    }

};

export default resetPasswordController;