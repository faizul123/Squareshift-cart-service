import mongoose, { Connection } from "mongoose";
import { MongoMemoryServer } from 'mongodb-memory-server';

export default async function connectDB() {
    // This will create an new instance of "MongoMemoryServer" and automatically start it
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri, {
        dbName: "test_db"
    });
    
}
