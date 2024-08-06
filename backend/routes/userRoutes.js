const express=require('express')
const {updateUser, deleteUser}=require("../controller/userController")
const requireAuth = require('../middleware/requireAuth')

const router=express.Router()

router.put("/update/:userId",requireAuth,updateUser)
router.delete("/delete/:userId",requireAuth,deleteUser)

module.exports=router