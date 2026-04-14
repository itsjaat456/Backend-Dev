import mongoose from "../config/mongodb.config.js";


const userSchema = mongoose.Schema({
    name:{type:String,
        require :true,}
        ,
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true
    }  

})  

export default mongoose.model("User",userSchema);