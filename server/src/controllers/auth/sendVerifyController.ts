import { Request, Response } from 'express-serve-static-core'; 
import nodemailer from 'nodemailer';
import { User } from '../../models/User';
import { IAPIResponse } from '../../types/IApiResponse';
import { createVerificationToken } from '../../utils/createTokens';
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

        // Create a verification token
        const token = createVerificationToken(user.id);

        // Create the message
        const mailOptions = {
            from: process.env.NODEMAILER_USER,
            to: email,
            subject: 'Verify Your Account',
            html:
            `
                <p>Please verify your email by clicking the following link: <a href="${process.env.DOMAIN}/api/auth/verify-account?token=${token}">Verify Email</a></p>
            `
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        // Send success response when email sent
        const response: IAPIResponse = { message: 'Verification email sent', code: 200 };
        res.status(response.code).json(response);
        return;

    }

    catch(error) {

        console.error(`Send Verify Email Error: ${error}`);
        const response: IAPIResponse = { message: 'Internal Server Error', code: 500 };
        res.status(response.code).json(response);

    }

};

export default sendVerifyController;