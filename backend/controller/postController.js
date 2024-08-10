const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Post = require("../models/postModel");

const errorHandler = (res, error) => {
  console.error(error);
  res.status(500).json({ error: "Internal Server Error" });
};

const createPost = async (req, res, next) => {
  try {
    const findUser = await User.findById(req.user);

    if (!findUser.isAdmin) {
      return res
        .status(403)
        .json({ message: "You are not allowed to create a post" });
    }

    if (!req.body.title || !req.body.content) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const slug = req.body.title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "");

    const newPost = new Post({
      ...req.body,
      slug,
      userId: req.user
    });

    const savedPost = await newPost.save();
    res.status(200).json({ savedPost: savedPost });
  } catch (error) {
    errorHandler(res, error);
  }
};

/*const getPosts=async(req,res,next)=>{
  try {
    const startIndex=parseInt(req.query.startIndex)||0;

    const limit=parseInt(req.query.limit)||9;

    const sortDirection=req.query.order==='asc'?1:-1;

    const posts=await Post.find(
      ...(req.query.userId && {userId: req.query.userId}),
      ...(req.query.category && {category: req.query.category}),
      ...(req.query.slug && {category: req.query.slug}),
      ...(req.query.postId && {_id: req.query.postId}),
      ...(req.query.searchItem && {
        $or:[
          {title: {$regex: req.query.searchItem, $options:'i'}},
          {content: {$regex: req.query.searchItem, $options:'i'}}
        ]
      }),
    )
    .sort({updatedAt:sortDirection})
    .skip(startIndex)
    .limit(limit)

    const totalPosts=await Post.countDocuments();

    const now=new Date()

    const oneMonthAgo=new Date(
      now.getFullYear(),
      now.getMonth()-1,
      now.getDate()
    )

    const lastMonthPosts=await Post.countDocuments({
      createdAt:{$gte:oneMonthAgo}
    })

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts
    })
  } catch (error) {
    errorHandler(res,error);
  }
}*/

const getPosts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;

    // Build the query object
    let query = {};
    
    if (req.query.userId) {
      query.userId = req.query.userId;
    }
    
    if (req.query.category) {
      query.category = req.query.category;
    }

    if (req.query.slug) {
      query.slug = req.query.slug;
    }

    if (req.query.postId) {
      query._id = req.query.postId;
    }

    if (req.query.searchItem) {
      query.$or = [
        { title: { $regex: req.query.searchItem, $options: 'i' } },
        { content: { $regex: req.query.searchItem, $options: 'i' } },
      ];
    }

    // Execute the query
    const posts = await Post.find(query)
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};


module.exports = {
  createPost,
  getPosts
};
