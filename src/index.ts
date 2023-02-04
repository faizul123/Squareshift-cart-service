import connectDB from "./connections/MongoClient";
import { createServer } from './app';


const startServer = async () => {
    await connectDB();
    createServer();
}

startServer();

