import { Request, Response } from 'express-serve-static-core'; 
import { User } from '../../models/User';
import { IAPIResponse } from '../../types/IApiResponse';
import { createResetToken, createVerificationToken } from '../../utils/createTokens';
import { transporter } from '../../server';

const sendVerifyController = async (req: Request, res: Response) => {

    try {

        // Get the email address from the request body
        const { email } = req.body;

        // Find the user accoicated with the email
        const user = await User.findOne({ email });

        // If no user is found do not send a email
        if(!user) {

            const response: IAPIResponse = { message: 'User Not Found', code: 404 };
            res.status(response.code).json(response);
            return;

        }

        // Create a reset token
        const token = createResetToken(user.id);

        // Create the message
        const mailOptions = {
            from: process.env.NODEMAILER_USER,
            to: email,
            subject: 'Reset Your Password',
            html:
            `
                <p>Click the link to reset your password: <a href="${process.env.DOMAIN}/reset-password?token=${token}">Reset Password</a></p>
            `
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        // Send success response when email sent
        const response: IAPIResponse = { message: 'Password reset email sent', code: 200 };
        res.status(response.code).json(response);
        return;

    }

    catch(error) {

        console.error(`Send Password Reset Email Error: ${error}`);
        const response: IAPIResponse = { message: 'Internal Server Error', code: 500 };
        res.status(response.code).json(response);

    }

};

export default sendVerifyController;