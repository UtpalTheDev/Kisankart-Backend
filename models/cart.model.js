const mongoose=require('mongoose');

require("mongoose-type-url");
//schema
const itemsSchema=new mongoose.Schema({

  itemId:{type:String,required:true},
  qty:{type:Number,required:true}
})
const cartSchema=new mongoose.Schema({

 userId:{type:String,required:true}, 
 items:[itemsSchema]
})
//model creation
const cartmodel=mongoose.model('cart',cartSchema);

module.exports={cartmodel}   
