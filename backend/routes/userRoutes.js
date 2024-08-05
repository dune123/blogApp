const express=require('express')
const {updateUser}=require("../controller/userController")
const requireAuth = require('../middleware/requireAuth')

const router=express.Router()

router.put("/update/:userId",requireAuth,updateUser)


module.exports=router