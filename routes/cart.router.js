const express=require("express");
const { v4: uuidv4 } = require('uuid');
const router=express.Router();
const { extend } = require("lodash");
const {cartmodel}=require("../models/cart.model.js")



router.route('/')
 .get(async (req, res) => {
   try{
     const {userId}=req;
     console.log(userId)
     const products=await cartmodel.findOne({userId});
     res.status(200).json(products)
   }
   catch (error){
     res.status(500).json({success:500,message:"unable to get products",errormessage:error.message})
   }
  
})
.post(async(req, res) => {
  try{
     const {userId}=req;
     let {items}=req.body;
     console.log("sks",items)
     let previtems=await cartmodel.findOne({userId}) ; 
     if(!previtems){
      await cartmodel.create({userId,items:[]});
      previtems=await cartmodel.findOne({userId}) ; 
     }
  console.log("here");
  if(!previtems.items.find(dataitem=>dataitem.itemId===items.itemId)){
  let data={...previtems,items:[...previtems.items,items]};
  console.log({data})
  data=extend(previtems,data);
  let savedproduct=await data.save();
  res.json({success:true,product:savedproduct})
  }
  }
  catch (error){
    
    res.status(500).json({success:false,message:"unable to add products",errormessage:error.message})
  }
})
.put(async(req,res)=>{
  try{
     const {userId}=req;
    
    let previtems=await cartmodel.findOne({userId}) ; 
    let {items}=req.body;
    console.log(previtems);

    
      let mapdata=previtems.items.map(eachitem=>{
          console.log("in if loop",eachitem.itemId,items.itemId)
      if(eachitem.itemId===items.itemId){
        
        return eachitem.qty=items.qty
      }
      return eachitem
    })

    await previtems.save();
    res.json({success:true,product:mapdata})
  }
  catch(error){
    console.log(err);
    res.status(500).json({success:false,message:"unable to update products",errormessage:error.message})
  }
})
.delete(async(req,res)=>{
  try{console.log(req.body);
  const {userId}=req;
  let previtems=await cartmodel.findOne({userId}) ; 
  let {itemId}=req.body;
  let filterdata=previtems.items.filter(eachitem=>eachitem.itemId!==itemId);
  console.log("filter",filterdata);
  let newdata={...previtems,items:filterdata}
    console.log("newdata",newdata)
  let data=extend(previtems,newdata);
  let savedproduct=await data.save();

  res.json({success:true})
  }
  catch(error){
    console.log(err);
        res.status(500).json({success:false,message:"unable to delete products",errormessage:error.message})
  }
});


module.exports=router;


