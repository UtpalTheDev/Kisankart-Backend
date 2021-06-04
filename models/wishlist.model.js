const mongoose=require('mongoose');
require("mongoose-type-url");
//schema

const wishlistSchema=new mongoose.Schema({
 userId:{type:String,required:true}, 
 items:[{type:String,required:true}]
})
//model creation
const wishlistmodel=mongoose.model('wishlist',wishlistSchema);

module.exports={wishlistmodel}