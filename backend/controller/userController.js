const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { parse } = require("dotenv");
const jwt = require("jsonwebtoken");

const errorHandler = (res, error) => {
  console.error(error);
  res.status(500).json({ error: "Internal Server Error" });
};

const updateUser = async (req, res, next) => {
  if (req.user !== req.params.userId) {
    return res
      .status(403)
      .json({ message: "You are not allowed to update this user" });
  }

  if (req.body.password) {
    if (req.body.password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    req.body.password = await bcrypt.hash(req.body.password, 10);
  }

  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return res
        .status(400)
        .json({ message: "Username must be between 7 and 20 characters" });
    }
    if (req.body.username.includes(" ")) {
      return res.status(400).json({ message: "Username cannot contain space" });
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return res.status(400).json({ message: "Username must be lowercase" });
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return res
        .status(400)
        .json({ message: "Username can only contain letters and numbers" });
    }
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteUser = async (req, res, next) => {
  if (!req.user.isAdmin && req.user != req.params.userId) {
    return res
      .status(403)
      .json({ message: "You are not allowed to delete this user" });
  }
  try {
    await User.findByIdAndDelete(req.params.userId)
    res.status(200).json({message:'User has been deleted'})
  } catch (error) {
    errorHandler(res, error);
  }
};

const getUsers=async(req,res,next)=>{
  if(!req.user.isAdmin){
    return res.status(403).json({message:'You are not allowed to see all users'})
  }
  try {
    const startIndex=parseInt(req.query.startIndex)||0;
    const limit=parseInt(req.query.limit)||9;
    const sortDirection=req.query.sort==='asc'?1:-1;

    const users=await User.find()
    .sort({createdAt:sortDirection})
    .skip(startIndex)
    .limit(limit)

    const userWithoutPassword=users.map((user)=>{
      const {password,...rest}=user._doc;
      return rest;
    })

    const totalUsers=await User.countDocuments();

    const now=new Date();

    const oneMonthAgo=new Date(
      now.getFullYear(),
      now.getMonth()-1,
      now.getDate()
    )
    const lastMonthUsers=await User.countDocuments({
      createdAt:{$gte:oneMonthAgo}
    })

    return res.status(200).json({
      users: userWithoutPassword,
      totalUsers,
      lastMonthUsers,
    })

  } catch (error) {
    errorHandler(res, error);
  }
}

const getUser=async(req,res,next)=>{
  try {
    const user=await User.findById(req.params.userId);
    if(!user){
      return res.status(404).json({message:'user not Found'})
    }
    const {password,...rest}=user._doc;
    return res.status(200).json(rest);
  } catch (error) {
    errorHandler(res,error);
  }
}

module.exports = {
  updateUser,
  deleteUser,
  getUsers,
  getUser
};
