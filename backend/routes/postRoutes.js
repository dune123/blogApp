const express = require('express')
const {createPost, getPosts} =require('../controller/postController')
const requireAuth = require('../middleware/requireAuth')
const router=express.Router()

router.post("/createPost",requireAuth,createPost)
router.get("/getPosts",getPosts)

module.exports=router;