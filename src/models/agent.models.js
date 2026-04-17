import mongoose from "mongoose";

const agentSchema = new mongoose.Schema({
    name: { type: String, required: true ,
         minLength:[13,"add proper email"],
        maxLength:[200,"add proper email"]
    },
    phone: { type: String, required: true, unique: true },
    email: { type: String, unique: true,
        minLength:[13,"please enter the valid email "],
        maxLength:[200,"please enter the valid email "],
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email"]
     },
    password:{type:String,unique:true,match:[
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/
            ],
            minLength:[4,"please enter valid password"],
            maxLength:[10,"please enter valid password"]
        },
    vehicleType: { type: String, enum: ['Bike', 'Car', 'Scooter'], default: 'Bike' },
    vehicleNo:{type:String,require:true},
    isOnline: { type: Boolean, default: false },
    currentLocation: {
        lat: { type: Number, default: 0 },
        lng: { type: Number, default: 0 }
    },
    rating: { type: Number, default: 5.0 }
}, { timestamps: true });

export default mongoose.model("DeliveryAgent", agentSchema);