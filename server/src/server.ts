import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDb from './utils/connectDb';
import authRouter from './routes/authRoutes';
import createTransporter from './utils/transporter';
import router from './routes/routes';
import path from 'path';

// Load the .env variables
dotenv.config();

// Create a instance of the express app
const app = express();

// Connect to MongoDB
connectDb();

// Create a nodemailer transpoter
export const transporter = createTransporter();

// Middlewares
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api', router);

// Serve Static React Files
app.use(express.static(path.join(__dirname, '../../client/dist')));

app.get('*', (req: Request, res: Response): void => {

    res.sendFile(path.join(__dirname, '../../client/dist', 'index.html'));

});

// Start the server
const port = process.env.PORT;

app.listen(port, () => console.log(`Server is listening on port ${port}`));