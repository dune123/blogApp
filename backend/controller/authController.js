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

const signIn=async(req, res, next) => {
    try {
        const {email,password}=req.body;

        if(!email||!password||email===""||password===""){
            return res.status(400).json({message:"All fields are required"})
        }

        const validUser=await User.findOne({email})

        if(!validUser){
            return res.status(400).json({message:"User not found"})
        }

        //this is an async operation
        const validPassword=await bcrypt.compare(password,validUser.password)

        if(!validPassword){
            return res.status(400).json({message:"Invalid credentials"})
        }

        const token=jwt.sign(
            {
                user: validUser._id,
                isAdmin: validUser.isAdmin
              },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "7d" }
        )
        
        const {password:pass,...rest}=validUser._doc
        return res.status(201).json({
            success: true,
            token,
            rest
          });
    } catch (error) {
        errorHandler(res,error)
    }
}

const googleAuth=async (req,res,next)=>{
    const {email,name,googlePhotoUrl}=req.body;
    try {
        const validUser=await User.findOne({email})

        if(validUser){
            const token=jwt.sign(
                {
                    user: validUser._id,
                    isAdmin:validUser.isAdmin
                  },
                  process.env.JWT_SECRET_KEY,
                  { expiresIn: "7d" }
            )
            const {password,...rest}=validUser._doc;
            res.status(200).json({rest,token})
        }else{
            const generatePassword=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
            const hashedPassword=bcrypt.hash(generatePassword)

            const newUser=new User({
                username:name.toLowerCase().split(' ').join('')+Math.random().toString(9).slice(-4),
                email,
                password:hashedPassword,
                profilePicture:googlePhotoUrl
            })
            await newUser.save()
            const token=jwt.sign(
                {
                    user: newUser._id,
                    isAdmin:newUser.isAdmin
                  },
                  process.env.JWT_SECRET_KEY,
                  { expiresIn: "7d" }
            )
            const {password,...rest}=newUser._doc;
            res.status(200).json({rest,token})
        }     
    } catch (error) {
        errorHandler(res,error)
    }
}

const signOut=async(req,res,next)=>{
    try {
        const { userId } = req.body;

        const findUser = User.findById({ userId });
        console.log(userId)
        console.log(findUser)
        const token = jwt.sign(
          {
            user: userId,
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: 0 }
        );
    
        res.status(200).json({  success: true,
            token,
            userId: findUser._id,
            username: findUser.username,
            email: findUser.email,});
    } catch (error) {
        errorHandler(res,error);
    }
}

module.exports={
    signUp,
    signIn,
    signOut,
    googleAuth
}