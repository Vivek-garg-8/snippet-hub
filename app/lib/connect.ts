import mongoose from "mongoose";

async function connect(): Promise<void>{
    try {
        console.log("🛠️ Attempting to connect to Mongo at");
        await mongoose.connect(process.env.MONGO_URL as string);
        console.log("db connected...");
    }catch (error){
        console.error(error);
    }
}

export default connect;