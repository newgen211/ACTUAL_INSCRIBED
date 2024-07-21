import { NextFunction, Request, Response } from 'express';
import { IAPIResponse } from '../types/IApiResponse';
import jwt from 'jsonwebtoken';
import { IDecodedToken } from '../types/IDecodedToken';

const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {

    try {

        // Get the auth header
        const authHeader = req.headers.authorization;

        // If the auth header is not present than return unauthorized response
        if(!authHeader) {

            const response: IAPIResponse = { message: 'Authorization Header Missing', code: 401 };
            res.status(response.code).json(response);
            return;

        }

        // Extract the token from the header
        const token = authHeader.split(' ')[1];

        // If the token is not present respond with unauthorized
        if(!token) {

            const response: IAPIResponse = { message: 'Access Token Missing', code: 401 };
            res.status(response.code).json(response);
            return;

        }

        // Validate the JWT
        const decoded = jwt.verify(token, process.env.ACCESS_SECRET_KEY as string);
        
        req.user = decoded;

        next();

    }   

    
    catch(error) {

        console.log(`Login Check Error: ${error}`);

        if(error instanceof jwt.JsonWebTokenError) {

            const response: IAPIResponse = { message: 'Invalid Access Token', code: 400 };
            res.status(response.code).json(response);
            return;

        }

        if(error instanceof jwt.TokenExpiredError) {

            const response: IAPIResponse = { message: 'Access Token Expired', code: 400 };
            res.status(response.code).json(response);
            return

        }

        const response: IAPIResponse = { message: 'Internal Server Error', code: 500 };
        res.status(response.code).json(response);
        return;

    }

};

export default isLoggedIn;