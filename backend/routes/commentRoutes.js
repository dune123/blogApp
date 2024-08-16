const express= require('express')
const requireAuth=require('../middleware/requireAuth')
const {createComment, getPostComment, likeComment, editComment}=require('../controller/commentController')
const router=express.Router()

router.post('/create',requireAuth,createComment)
router.get('/getComments/:postId',getPostComment)
router.put('/likecomment/:commentId',requireAuth,likeComment)
router.put('/editComment/:commentId',requireAuth,editComment)

module.exports=router

