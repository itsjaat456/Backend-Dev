import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();
const url = process.env.URL;
 mongoose.connect(url)
 .then(()=>{
    console.log("connection stablished successfully ");
 })
 .catch(()=>{
    console.log("failed");
 })


 export default mongoose;
