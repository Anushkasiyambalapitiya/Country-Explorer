import express from 'express';
import { createAdmin, deactivateUserAccount, getAllUsers, signIn, signOut, signUp, test, updateUser } from '../Controllers/User.js';
import { verifyToken } from '../Utills/verifyUser.js';
import { verifyAdmin } from '../Utills/verifyAdmin.js';
import { profile } from '../Controllers/User.js';

const UserRoute = express.Router();
UserRoute.get("/test",test)
UserRoute.post("/signup", signUp);
UserRoute.post("/signIn",signIn);
UserRoute.post("/admin/signup",createAdmin);
UserRoute.get("/users",verifyToken,getAllUsers);  
UserRoute.get("/signOut",signOut);
UserRoute.put("/updateUser/:id",verifyToken,updateUser);
UserRoute.delete("/deactivateUser/:id",verifyToken,deactivateUserAccount);
UserRoute.get("/profile/:id",verifyToken,profile);


export default UserRoute;