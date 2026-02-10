import express from "express";
import create from "./src/user/create.js";
import filtering from "./src/user/filtering.js";


const app = express();
app.use(express.json());


app.post("/create",create)
app.get("/fil/:name",filtering)

const port  = 8080;
app.listen(port,()=>{
    console.log("server connect");
})