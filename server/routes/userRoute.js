const jwt = require("jsonwebtoken");
const users = require("../models/userModel");
const router=require('express').Router()
const bcrypt=require('bcryptjs')

//Register
router.post('/register',async(req,res)=>{
    try{
        const userExists=await users.findOne({email:req.body.email})
        if(userExists) throw new Error("User with this email already exists")

        //hash password
        req.body.password=await bcrypt.hash(req.body.password, 10)

        //create new user
        await users.create(req.body)
        res.status(201).json({message:"User registered successfully",success:true})
    }
    catch(error){
        res.status(500).json({message: error.message,success:false})
    }
})

//login
router.post('/login',async(req,res)=>{
    try{
        //check if user exists
        const user=await users.findOne({email:req.body.email})
        if(!user) throw new Error("User with this email does not exist")
        
        //check if password is correct
        const isPasswordCorrect=await bcrypt.compare(
            req.body.password,
            user.password
        )

        if(!isPasswordCorrect) throw new Error("Invalid password")
        
            //create token
            const token=jwt.sign({userId:user._id},process.env.jwt_secret,{
                expiresIn:"1d"
            })
        res.status(200).json({
            message:"User logged in successfully",
            success:true,
            data:token
        })
    }
    catch(error){
        res.status(500).json({message: error.message,success:false})

    }
})

module.exports=router