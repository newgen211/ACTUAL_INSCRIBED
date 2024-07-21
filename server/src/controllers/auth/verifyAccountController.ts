import { Request, Response } from 'express';
import { IAPIResponse } from '../../types/IApiResponse';
import jwt from 'jsonwebtoken';
import { User } from '../../models/User';

const verifyAccountController = async (req: Request, res: Response) => {

    try {

        // Get the token from the url
        const { token } = req.query;

        if (!token || typeof token !== 'string') {
            
            const response: IAPIResponse = { message: 'Invalid or missing token', code: 400 };
            res.status(response.code).json(response);
            return;

        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.VERIFY_SECRET_KEY as string) as { userId: string };

        // Find the user accociated with the token
        const user = await User.findById(decoded.userId);

        // If no user is found return error
        if(!user) {

            const response: IAPIResponse = { message: 'User not found', code: 404 };
            res.status(response.code).json(response);
            return;

        }

        // If the account is alredy verifed return error
        if(user.account_verified) {

            const response: IAPIResponse = { message: 'Account already verified', code: 400 };
            res.status(response.code).json(response);
            return;

        }

        // Update the user's status to verified
        user.account_verified = true;
        await user.save();

        // Respond with a success message
        const response: IAPIResponse = { message: 'Account verified successfully', code: 200 };
        res.status(response.code).json(response);
        return;

    }

    catch(error) {

        console.error(`Verification Error: ${error}`);

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
}

export default verifyAccountController;