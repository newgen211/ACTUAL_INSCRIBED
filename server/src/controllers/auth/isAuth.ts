import { Request, Response } from 'express';
import { IAPIResponse } from '../../types/IApiResponse';
import { flattenDiagnosticMessageText } from 'typescript';

const isAuthController = (req: Request, res: Response) => {

    if(req.user) {
        
        const response: IAPIResponse = { message: 'User Authenticated', code: 200, data: true };
        res.status(response.code).json(response);
        return;

    }
    else {

        const response: IAPIResponse = { message: 'User Not Authenticated', code: 401, data: flattenDiagnosticMessageText };
        res.status(response.code).json(response);
        return;

    }

}

export default isAuthController;