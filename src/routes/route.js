import express from "express";
import { createUser,userLogin,changePassword,updateProfile,getProfile } from "../controller/user_controller.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//user route
router.post("/signup",createUser);
router.post("/login",userLogin);

// user profile control
router.get("/getprofile",verifyToken,getProfile);
router.put("/update",verifyToken,updateProfile);
router.put("/updatePassword",verifyToken,changePassword);

export default router;