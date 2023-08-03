const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true, "Name field is required"]
  },
  rating:{
    type:Number,
    default:4.5
  },
  featured:{
    type:Boolean,
    default:false
  },
  createdAt:{
    type:Date,
    default:Date.now()
  },
  company:{
    type:String,
    // enum waxaad pass greynaysa inta value aad u bahantahy in la gu shubo fieldgaaga 
    enum:{
      values:["ikea","liddy","caressa","marcos"],
      message:"{VALUE} is not supported" //{VALUE} waa value uu qofku soo pass greyo ee aan ahyn ku wa aan inagu xusany
    }
  },
  price:{
    type:Number,
    required:[true, "Price field is required"]
  }
})

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;