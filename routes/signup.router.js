const express=require("express");
const bcrypt=require("bcrypt");
const router=express.Router();
const bodyParser=require("body-parser");
const {usermodel}=require("../models/user.model.js")
const {cartmodel}=require("../models/cart.model.js")
const {wishlistmodel}=require("../models/wishlist.model.js")
const {signupValidation} = require("../utils/validation")
let jwt=require('jsonwebtoken');

router.route("/")
.post(async(req,res)=>{
  try{

      const {error} = signupValidation(req.body.user);
      if (error){
        return res.status(400).json({message:error.details[0].message})
      }    
      const {userName,password,email}=req.body.user;
      let user=await usermodel.findOne({email});
      if(!user){
      user=await usermodel.create({userName,password,email});
      const salt=await bcrypt.genSalt(10);
      user.password=await bcrypt.hash(user.password,salt);
      await user.save();
      let cart=await cartmodel.create({userId:user._id,items:[]});
      let wishlist=await wishlistmodel.create({userId:user._id,items:[]});      
      res.status(200).json({message:"success"});
      }
      else{
        res.status(400).json({message:"email already exists"});
      }
      
  }
  catch(error){
    res.status(500).json({message:error});
  }
})
module.exports=router