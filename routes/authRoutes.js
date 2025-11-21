import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

dotenv.config();
const router = express.Router();

// register
router.post("/register", async(req , res )=>{
    try{
      const {name , email , password}= req.body;

      if(!name || !email || !password){
        res.status(400).json({message:"all fields are reqired"});
      }
      const existing = await User.findOne({email});
      if (existing)
        res.status(400).json({message:"user already exists"});
      
      const hashed = await bcrypt.hash(password ,10);
      const user = new User({name , email , password:hashed});
      await user.save();

      res.json({message:"user registered succesfully"});
    }
    catch (error){
      res.status(500).json({message:"serror error" , error});
    }
    
    
});

// login 
