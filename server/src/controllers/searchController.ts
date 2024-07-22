import { Request, Response } from 'express';
import { User } from '../models/User';
import { IAPIResponse } from '../types/IApiResponse';

const searchController = async (req: Request, res: Response) => {
    try {
        const query: string = req.body.query;

        if (!query || typeof query !== 'string') {
            const response: IAPIResponse = { message: 'Bad Request', code: 400, errors: [{ field: 'query', message: 'Query parameter is required and should be a string' }] };
            res.status(response.code).json(response);
            return;
        }

        const searchRegex = new RegExp(query, 'i');

        const users = await User.find({
            $or: [
                { first_name: { $regex: searchRegex } },
                { last_name: { $regex: searchRegex } },
                { username: { $regex: searchRegex } },
                { email: { $regex: searchRegex } }
            ]
        });

        const response: IAPIResponse = {
            message: 'Search Results Retrieved',
            code: 200,
            data: users.map(user => ({
                first_name: user.first_name,
                last_name: user.last_name,
                username: user.username,
                email: user.email,
                bio: user.bio,
                profile_image: user.profile_image,
                created_at: user.created_at
            }))
        };

        res.status(response.code).json(response);
    } catch (error) {
        console.log(`Search Error: ${error}`);

        const response: IAPIResponse = { message: 'Internal Server Error', code: 500 };
        res.status(response.code).json(response);
    }
};

export default searchController;
