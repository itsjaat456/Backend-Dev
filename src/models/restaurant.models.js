
import mongoose from "../config/connection.Db.js";

// item Schema
const itemSchema = new mongoose.Schema({
    itemName: String,
    price: Number,
    description: String
});

// Category Schema
const categorySchema = new mongoose.Schema({
    category: String,
    items: [itemSchema]
});

// Restaurant Schema
const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: { type: String, unique: true,
        minLength:[13,"please enter the valid email "],
        maxLength:[200,"please enter the valid email "],
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email"]
     },
    password:{type:String,unique:true,
        minLength:[4,"please enter the valid password "],
        maxLength:[10,"please enter the valid password "],
        match:[
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/
            ]},
    location: {
        type: String,
    },
    menu: {
        type: [categorySchema],
        required: true,
        default:[]
        
    }
});

// Export Model
export default mongoose.model("Restaurant", restaurantSchema);