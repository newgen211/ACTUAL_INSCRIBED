import jwt from 'jsonwebtoken';

export const createVerificationToken = (userId: string): string => {


    const token = jwt.sign({ userId }, process.env.VERIFY_SECRET_KEY as string , { expiresIn: '15m' });

    return token;

};

export const createResetToken = (userId: string): string => {


    const token = jwt.sign({ userId }, process.env.RESET_SECRET_KEY as string , { expiresIn: '15m' });

    return token;

};

export const createAccessToken = (userId: string): string => {


    const token = jwt.sign({ userId }, process.env.ACCESS_SECRET_KEY as string , { expiresIn: '1h' });

    return token;

};
