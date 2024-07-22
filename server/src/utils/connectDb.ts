import mongoose from 'mongoose';

const connectDb = async () => {

    try {

        // Get the mongodb uri
        const uri = process.env.MONGO_URI as string;

        // Connect to the db
        await mongoose.connect(uri);

        // Log connection
        console.log('Connected to MongoDB');

    }

    catch(error) {

        console.log(`MongoDB Error: ${error}`);

    }

};

export default connectDb;