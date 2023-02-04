import './config/init-config';
import { Server } from 'http';
import mongoose from 'mongoose';
import connectDB from "./connections/MongoClient";
import { createServer } from './app';

let server: Server = null;

const startServer = async () => {
    await connectDB();
    server = createServer();
    process.on('SIGINT', gracefulShutdown);
    process.on('SIGTERM', gracefulShutdown);
}

const gracefulShutdown = () => {
    console.info('SIGINT signal received.');
    console.log('Closing http server.');
    server.close(() => {
      console.log('Http server closed.');
      mongoose.connection.close(false, () => {
        console.log('MongoDb connection closed.');
        process.exit(0);
      });
    });
  }


startServer().catch(err => console.log(err));

