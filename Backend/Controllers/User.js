
import express from 'express';
import User from '../Models/User.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { errorHandler } from '../Utills/error.js';

export const test= async(req,res)=>{
     return res.json("api works")
}


export const signUp =async (req, res,next) =>{
  
  try {
    const {username,email,password,mobileNumber,profilePicture,status} = req.body;

    // Validate mobile number
    if (!mobileNumber || !/^\d{10}$/.test(mobileNumber)) {
      return res.status(400).json({ 
        status: false, 
        message: "Mobile number must be exactly 10 digits" 
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.json({ status: false, message: "User already exists" });
    }
  
    const hashPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashPassword,
      mobileNumber,
      profilePicture,
      status,
      accountStatus:1
    });
  
    await newUser.save();
    return res.json({ status: true, message: "User registered successfully" });
  } catch (error) {
    next(error);
    console.log(error);
  }
  
 
}
export const signIn = async(req,res,next)=>{
  const {email,password} = req.body;
  if(!email || !password || email==="" || password===""){
    next(errorHandler(400,"All fields are required"));
  }
  try{
    const validUser = await User.findOne({email});
    if(!validUser) return next(errorHandler(404,'User not found!'));
    const validPassword = bcryptjs.compareSync(password,validUser.password);
    if(!validPassword) return next(errorHandler(400,'Invalid Credentials!'));
    const token = jwt.sign({id:validUser._id, status: validUser.status  },process.env.JWT_SECRET);
    const{password:hashedPassword, ...rest} = validUser._doc;
    const expiryDate = new Date(Date.now()+3600000);


    const htmlBody = `
    <h1>Hi ${validUser.username}</h1>
    <p>You have successfully logged into FINANCE TRACKER.</p>
    <p>Thank you</p>
  `;
  
  

var transporter = nodemailer.createTransport({
service: 'gmail',
auth: {
  user: 'priyamanthabandara.en01@gmail.com',
  pass: 'apxs kcvx dvvz rnyg'
}
});

var mailOptions = {
from: 'priyamanthabandara.en01@gmail.com',
to: `${validUser.email}`,
subject: '',
html: htmlBody,
};

transporter.sendMail(mailOptions, function(error, info){
if (error) {
  console.log(error);
} else {
  res
    .cookie("token", token, { httpOnly: true, expires: expiryDate })
    .status(200)
    .json({
      message: "User Login successfully",
      user: rest,
    });
}
});
   
  }catch(error){
    next(error);
  }
}

export const createAdmin= async (req, res) => {
  try {
    const {username,email,password,mobileNumber,profilePicture,status} = req.body;

    // Validate mobile number
    if (!mobileNumber || !/^\d{10}$/.test(mobileNumber)) {
      return res.status(400).json({ 
        status: false, 
        message: "Mobile number must be exactly 10 digits" 
      });
    }

    const existingAdmin = await User.findOne({ email: email });
    if (existingAdmin) {
        return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = bcryptjs.hashSync("adminpassword123", 10);
    const admin = new User({
      username,
      email,
      password: hashedPassword,
      mobileNumber,
      profilePicture,
      status
    });
    await admin.save();
    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
  }
};


export const adminSignIn = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
      return next(errorHandler(400, "All fields are required"));
  }

  try {
      const validUser = await User.findOne({ email });

      if (!validUser) return next(errorHandler(404, 'User not found!'));

      if (validUser.status !== 1) {
          return next(errorHandler(403, "Access denied! Only admins can log in."));
      }

      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) return next(errorHandler(400, 'Invalid Credentials!'));

      const token = jwt.sign(
          { id: validUser._id, status: validUser.status },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
      );

      const { password: hashedPassword, ...rest } = validUser._doc;
      res.cookie('token', token, { httpOnly: true, expires: new Date(Date.now() + 3600000) })
          .status(200)
          .json({ message: "Admin login successful", user: rest });

  } catch (error) {
      next(error);
  }
};

export const getAllUsers = async (req, res) => {
  try {
 

      User.find({}).then((users)=>{
        res.json(users)
  
  
  })
  } catch (error) {
      res.status(500).json({ message: "Server error", error });
  }
};


export const signOut  = async (req, res) => { 

  try {
    res.clearCookie("token");
    return res.json({ status: true, message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
  }
  };



  
export const updateUser =  async (req, res) => {
  const { id } = req.params;
  console.log("user id", id);
  const {username, email, password, mobileNumber, profilePicture, status} = req.body;

  // Validate mobile number if it's being updated
  if (mobileNumber && !/^\d{10}$/.test(mobileNumber)) {
    return res.status(400).json({ 
      status: false, 
      message: "Mobile number must be exactly 10 digits" 
    });
  }

  try {
    await User.findByIdAndUpdate(
      id,
      {
        username: username,
        email: email,
        mobileNumber: mobileNumber,
        profilePicture: profilePicture,
        status: status
      }
    );
    return res.json({ status: true, message: "User updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to update user" });
  }
};
export const deactivateUserAccount =  async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndUpdate(
      id,
      {
        accountStatus: 0
      }
    );
    res.clearCookie("token");
    return res.json({ status: true, message: "Your account de-activated successfully" });
  } catch (error) {
    console.log(error);
  }
};


export const profile= async (req, res) => {
  const id = req.params.id;
  console.log("user id",req.params);

  try {
    const user = await User.findById({ _id: id });
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if(user.accountStatus === 0){
      return res.status(404).json({ error: "Your Account is De-activated" });
    }
    res.json({
      username: user.username,
      email: user.email,
      mobilenumber: user.mobileNumber,
      profilePicture: user.profilePicture,
      status: user.status
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
