import express from 'express';
import dotenv from 'dotenv';
import connectDb from './utils/connectDb';

// Load the .env variables
dotenv.config();

// Create a instance of the express app
const app = express();

// Connect to MongoDB
connectDb();

// Middlewares
app.use(express.json());

// Routes

// Serve Static React Files


// Start the server
const port = process.env.PORT;

app.listen(port, () => console.log(`Server is listening on port ${port}`));