import nodemailer from 'nodemailer';

const createTransporter = () => {

    // Create the transporter
    const transporter = nodemailer.createTransport({
        host: process.env.NODEMAILER_HOST,
        port: 465,
        secure: true,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS
        }
    });

    return transporter;

};

export default createTransporter;