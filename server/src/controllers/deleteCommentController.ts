import { Request, Response } from 'express';
import { Comment } from '../models/Comment';
import { IAPIResponse } from '../types/IApiResponse';

const deleteCommentController = async (req: Request, res: Response) => {

    try {

        const { postId, commentId } = req.params;

        // Check if the comment exists and belongs to the post
        const comment = await Comment.findOne({ _id: commentId, post: postId });

        if (!comment) {
         
            const response: IAPIResponse = { message: 'Comment not found or does not belong to the specified post', code: 404 };
            res.status(response.code).json(response);
            return;

        }

        // Check if the user owns the comment
        if (comment.user.toString() !== req.user.userId) {
            const response: IAPIResponse = { message: 'Unauthorized to delete this comment', code: 403 };
            res.status(response.code).json(response);
            return;
        }

        // Delete the comment
        await Comment.deleteOne({ _id: commentId });

        // Return a success response
        const response: IAPIResponse = { message: 'Comment deleted successfully', code: 200 };
        res.status(response.code).json(response);
        return;


    }

    catch(error) {

        console.log(`Delete Comment Error: ${error}`);

        // Send error response
        const response: IAPIResponse = { message: 'Internal Server Error', code: 500 };
        res.status(response.code).json(response);
        return;

    }

};

export default deleteCommentController;