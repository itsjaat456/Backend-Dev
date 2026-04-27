import mongoose from "../config/connection.db.js"

// user ka schema
const  userSchema =new mongoose.Schema({
    name:{
        type: String,
        required:true,
        maxlength: 50   
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        match:[
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/
            ],
        required: true
    },
});

// exporting model

export default mongoose.model("user",userSchema);