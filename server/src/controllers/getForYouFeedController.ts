import { Request, Response } from 'express';
import { Post } from '../models/Post';
import { Follow } from '../models/Follow';
import { IAPIResponse } from '../types/IApiResponse';

const getForYouFeedController = async (req: Request, res: Response) => {
    try {
        const userId = req.user.userId;

        // Pagination parameters
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        
        // Calculate the skip value for pagination
        const skip = (page - 1) * limit;

        // Get the list of users the current user follows
        const following = await Follow.find({ follower: userId }).select('following').lean();

        // Extract the id's from the following
        const followingIds = following.map(f => f.following);

        // If the user is not follopwing anyone return page/0 pages
        if (followingIds.length === 0) {

            const response: IAPIResponse = { 
                
                message: 'No Posts In Feed', 
                code: 200,
                data: {
                    posts: [],
                    currentPage: page,
                    totalPages: 0,
                    totalPosts: 0
                }
            };

            res.status(response.code).json(response);
            return;
            
        }

        // Fetch posts from the followed users with pagination
        const posts = await Post.find({ user: { $in: followingIds } })

            .sort({ created_at: -1 })
            .skip(skip)
            .limit(limit)
            .populate('user', 'username profile_image')
            .lean();

        // Get the total count of posts
        const totalPosts = await Post.countDocuments({ user: { $in: followingIds } });

        // Send success message with the posts
        const response: IAPIResponse = {
            
            message: 'User Feed Successfully Fetched',
            code: 200,
            data: {
                posts,
                currentPage: page,
                totalPages: Math.ceil(totalPosts / limit),
                totalPosts
            }
        };


        res.status(response.code).json(response);
        return;

    } 
    
    catch (error) {

        console.error(`Error Getting For You Feed: ${error}`);

        const response: IAPIResponse = { message: 'Internal Server Error', code: 500  };
        res.send(response.code).json(response);
        return;

    }
};

export default getForYouFeedController;
