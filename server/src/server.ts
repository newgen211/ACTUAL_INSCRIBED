import express from 'express';
import dotenv from 'dotenv';
import connectDb from './utils/connectDb';
import authRouter from './routes/authRoutes';
import createTransporter from './utils/transporter';

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

// Serve Static React Files


// Start the server
const port = process.env.PORT;

app.listen(port, () => console.log(`Server is listening on port ${port}`));