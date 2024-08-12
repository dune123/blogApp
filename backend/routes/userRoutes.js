const express=require('express')
const {updateUser, deleteUser, getUsers}=require("../controller/userController")
const requireAuth = require('../middleware/requireAuth')

const router=express.Router()

router.put("/update/:userId",requireAuth,updateUser)
router.delete("/delete/:userId",requireAuth,deleteUser)
router.get("/getusers",requireAuth,getUsers)

module.exports=router