import mongoose from "../config/connection.Db.js";



const userSchema = new mongoose.Schema({
    name:{
        type:String,
        minLength:[3,"add proper name"],
        maxLength:[15,"add proper name"]
    },
    email: { type: String, unique: true,
        minLength:[13,"please enter the valid email "],
        maxLength:[200,"please enter the valid email "],
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email"]
     },

    password:{
            type:String,
            required:true,
          
    },
    mob:{
        type:String,
        require:true,
        minLength:[10],
        maxLength:[12]
    },
    dob:{type:Date,
        require:true,
        trim:true
    },
    address:String
})
export default mongoose.model("User",userSchema);