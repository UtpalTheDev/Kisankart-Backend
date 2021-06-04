const mongoose=require('mongoose');

//schema
const productSchema=new mongoose.Schema({
    name: {type:String,required:true},
    image: {type:String,required:true},
    price: {type:Number,required:true},
    material: {type:String,required:true},
    brand: {type:String,required:true},
    inStock: {type:Boolean,required:true},
    isnew: {type:Boolean,required:true},
    fastDelivery: {type:Boolean,required:true},
    ratings:{type:Number,required:true},
    offer: {type:Number,required:true},
    idealFor:{type:String ,required:true},
    color: {type:String,required:true}
})
//model creation
const productmodel=mongoose.model('product',productSchema);

module.exports={productmodel}