const express=require('express')
const { signUp, signIn,signOut, googleAuth }=require("../controller/authController")
const requireAuth = require('../middleware/requireAuth')
const router=express.Router()

router.post("/signup",signUp)
router.post("/signin",signIn)
router.post("/signout",signOut)
router.post("/googleAuth",googleAuth)

module.exports=router