const express = require('express')
const {createPost, getPosts, deletePost, updatePost} =require('../controller/postController')
const requireAuth = require('../middleware/requireAuth')
const router=express.Router()

router.post("/createPost",requireAuth,createPost)
router.get("/getPosts",getPosts)
router.delete("/deletePost/:postId/:userId",requireAuth,deletePost)
router.put("/updatePost/:postId/:userId",requireAuth,updatePost)

module.exports=router;