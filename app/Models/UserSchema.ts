import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";

const userSchema = new mongoose.Schema(
    {
        clerkUserId: {type: String , unique:true , required:true},
        emailAddress: {type: String , required: true},
    },
    {timestamps: true}
);

const User = mongoose.models.User || mongoose.model("User" , userSchema);

export default User;