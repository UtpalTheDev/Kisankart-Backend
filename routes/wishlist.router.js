const express=require("express");
const { v4: uuidv4 } = require('uuid');
const router=express.Router();
const { extend } = require("lodash");
const {wishlistmodel}=require("../models/wishlist.model.js")



router.route('/')
 .get(async (req, res) => {
   try{
     const {userId}=req;
     const products=await wishlistmodel.findOne({userId});
     res.status(200).json(products)
   }
   catch (error){
     res.status(500).json({success:500,message:"unable to get products",errormessage:err.message})
   }
  
})
.post(async(req, res) => {
  try{
   const {userId}=req;
   let previtems=await wishlistmodel.findOne({userId}) ; 
   if(!previtems){
    await wishlistmodel.create({userId,items:[]});
     previtems=await wishlistmodel.findOne({userId}) ; 
   }
  console.log("here");
  let {itemId}=req.body;
  if(!previtems.items.find(dataitem=>dataitem===itemId)){
  let data={...previtems,items:[...previtems.items,itemId]};
  console.log({data})
  data=extend(previtems,data);
  let savedproduct=await data.save();
  res.json({success:true,product:savedproduct})
  }
  
  }
  catch (err){
    console.log(err);
    res.status(500).json({success:false,message:"unable to add products",errormessage:err.message})
  }
})

.delete(async(req,res)=>{
  try{
  const {userId}=req;
  let previtems=await wishlistmodel.findOne({userId}) ; 
  let {itemId}=req.body;
  let filterdata=previtems.items.filter(eachitem=>eachitem!==itemId);

  let newdata={...previtems,items:filterdata}
    
  let data=extend(previtems,newdata);
  let savedproduct=await data.save();
  res.json({success:true,savedproduct})
  }
  catch(err){
        res.status(500).json({success:false,message:"unable to delete products",errormessage:err.message})
  }
});



module.exports=router;