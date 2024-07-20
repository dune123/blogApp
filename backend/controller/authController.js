const User=require("../models/userModel")
const bcrypt=require('bcrypt')
const jwt = require("jsonwebtoken");

const errorHandler = (res, error) => {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  };

const signUp=async(req,res,next)=>{
    try {
        const {username,email,password}=req.body;
        
        if(!username||!password||!email||username===""||email===""||password===""){
            return res.status(400).json({message:"All fields are required"})
        }
        
        const findEmail=await User.find({email:email})

        if(findEmail.length>0){
            return res.status(409).json({message:"Email already exist"})
        }
        
        const hashedPassword=await bcrypt.hash(password,10);

        const newUser=new User({
            username,
            email,
            password:hashedPassword
        })
        
        await newUser.save();
        return res.status(200).json({message:"user created successfully"})
    } catch (error) {
        errorHandler(res,error)
    }
}

module.exports={
    signUp
}