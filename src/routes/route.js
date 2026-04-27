import express from "express";
import { createUser,userLogin,changePassword,updateProfile,getProfile, forgotPassword, verifyOtpAndReset } from "../controller/user_controller.js";
import { verifyToken } from "../middleware/auth.js";
import { addStock, deleteStock, sellStock, updateStock } from "../controller/stock_controllerr.js";

const router = express.Router();

//user route
router.post("/signup",createUser);
router.post("/login",userLogin);

// user profile control
router.get("/getprofile",verifyToken,getProfile);
router.put("/update",verifyToken,updateProfile);
router.put("/updatePassword",verifyToken,changePassword);

// for forgot password
router.post("/forgot-pass",forgotPassword);
router.post("/verify-otp",verifyOtpAndReset);

// stock
router.post("/stock-add",verifyToken,addStock);
router.post("/stock-sell",verifyToken,sellStock);
router.put("/stock-update",verifyToken,updateStock);
router.delete("/stock-delete",verifyToken,deleteStock);

export default router;