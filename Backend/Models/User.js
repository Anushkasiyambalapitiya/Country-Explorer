import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg',
    },
    status: {
        type: Number,
        enum: [0, 1], // 0 = User, 1 = Admin
        default: 0
    },
    accountStatus: {
        type: Number,
        enum: [0, 1], // 0 = User, 1 = Admin
        default: 0
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
