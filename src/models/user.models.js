import mongoose from "../connection/db.connection.js";


const userSchema = mongoose.Schema({
    name:{
        type:String,
        minLength:[3],
        maxLength:[100],
        required:true
    },
    email:{
        type:String,
        minLength:[13],
        maxLength:[200],
        require:true
    },
    password:{
        type:String,
        minLength:[4],
        maxLength:[8],
        required:true
    },
    role:{
        type:String,
        enum:["admin","user"],
       default:"user"
    },
    createAt:{
        Date:new Date()
    }
})

export default mongoose.model("User",userSchema);