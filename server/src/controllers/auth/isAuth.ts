import { Request, Response } from 'express';
import { IAPIResponse } from '../../types/IApiResponse';

const isAuthController = (req: Request, res: Response) => {

    if(req.user) {
        
        const response: IAPIResponse = { message: 'User Authenticated', code: 200 };
        res.status(response.code).json(response);
        return;

    }
    else {

        const response: IAPIResponse = { message: 'User Not Authenticated', code: 401 };
        res.status(response.code).json(response);
        return;

    }

}

export default isAuthController;