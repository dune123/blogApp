const Comment = require("../models/commentModel")

const errorHandler = (res, error) => {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  };

const createComment=async(req,res,next)=>{
    try {
        const {content,postId,userId}=req.body;
        
        if(!content){
            return res.status(403).json({message:"comment is required"})
        }
        
        if(userId!==req.user.id){
            return res.status(403).json({message:"You are not allowed to create this comment"})
        }

        const newComment=new Comment({
            content,
            postId,
            userId
        })

        await newComment.save();

        return res.status(200).json(newComment)
    } catch (error) {
        errorHandler(res,error);
    }
}

const getPostComment=async(req,res,next)=>{
    try {
        const comments=await Comment.find({postId:req.params.postId}).sort({
            createdAt:-1
        })
        return res.status(200).json(comments);
    } catch (error) {
        errorHandler(res,error);
    }
}

const likeComment=async(req,res,next)=>{
    try {
        const comment=await Comment.findById(req.params.commentId);

        if(!comment){
            return res.status(404).json({message:'Comment not found'})
        }

        const userIndex=comment.likes.indexOf(req.user.id);
        if(userIndex===-1){
            comment.numberOfLikes+=1;
            comment.likes.push(req.user.id)
        }
        else{
            comment.numberOfLikes-=1;
            comment.likes.splice(userIndex,1);
        }
        await comment.save();

        return res.status(200).json(comment)
    } catch (error) {
        errorHandler(res,error);
    }
}

const editComment=async(req,res,next)=>{
    try {
        const comment=await Comment.findById(req.params.commentId);
        if(!comment){
            return res.status(404).json({message:"Comment not found"})
        }

        if(comment.userId!==req.user.id && !req.user.isAdmin){
            return res.status(403).json({message:"You are not allowed to edit"})
        }

        const editComment=await Comment.findByIdAndUpdate(
            req.params.commentId,
            {
                content:req.body.content
            },
            {new:true}
        )

        return res.status(200).json(editComment)
    } catch (error) {
        errorHandler(res,error);
    }
}

const deleteComment=async(req,res,next)=>{
    try {
        const comment=await Comment.findById(req.params.commentId);
        if(!comment){
            return res.status(404).json({message:"Comment not Found"})
        }

        if(comment.userId!==req.user.id){
            return res.status(403).json({message:"You are not allowed to delete this comment"})
        }

        await Comment.findByIdAndDelete(req.params.commentId)

        return res.status(200).json({message:"Comment deleted"});
    } catch (error) {
        errorHandler(res,error);
    }
}

const getComments=async(req,res,next)=>{
    if(!req.user.isAdmin){
        return res.status(403).json({message:"You are not allowed to get all comments"})
    }
    try {
        const startIndex=parseInt(req.query.startIndex)||0;
        const limit=parseInt(req.query.limit)||9;
        const sortDirection=req.query.sort=='dsc'?-1:1;
        const comments=await Comment.find()
            .sort({createdAt:sortDirection})
            .skip(startIndex)
            .limit(limit)
        const totalComments=await Comment.countDocuments();
        const now=new Date();
        const oneMonthAgo=new Date(
            now.getFullYear(),
            now.getMonth()-1,
            now.getDate()
        )

        const lastMonthComments=await Comment.countDocuments({
            createdAt: { $gte: oneMonthAgo },
          });
        return res.status(200).json({ comments, totalComments, lastMonthComments });
    } catch (error) {
        errorHandler(res,error);
    }
}

module.exports={
    createComment,
    getPostComment,
    likeComment,
    editComment,
    deleteComment,
    getComments
}