import mongoose from "../config/connection.config.js";

const cart = mongoose.Schema({
    id:{
        type:String,
    },
    name:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    quantity:{
        type:Number,
        require:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export default mongoose.model("cart",cart);