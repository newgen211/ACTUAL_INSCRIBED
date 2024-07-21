import { Request, Response, NextFunction } from 'express';
import { z, ZodEffects, ZodError, ZodObject } from 'zod';
import { IAPIResponse } from '../types/IApiResponse';


export function validateRequestInput(schema: z.ZodObject<any, any> | ZodEffects<ZodObject<any, any>>) {

    return (req: Request, res: Response, next: NextFunction): void => {

        try {

            schema.parse(req.body);
            next();

        }
        catch(error) {

            // Log the error
            console.error(`Error occured while validating request body input: ${error}`);

            // Handle a validation error

            if(error instanceof ZodError) {

                const response: IAPIResponse = {
                    message: 'Input Validation Errors',
                    code:    400,
                    errors: error.errors.map(err => ({ field: err.path.join('.'), message: err.message, code: err.code }))
                };

                res.status(response.code).json(response);
                return;

            }

            // Handle any other error
            const response: IAPIResponse = {
                message: 'Internal Server Error',
                code:   500
            };

            res.status(response.code).json(response);
            return;

        }

    };

}