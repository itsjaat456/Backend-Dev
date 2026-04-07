import express from "express";
import reg from "../controller/user.controller.js";
import { createCart } from "../controller/cart.controller.js";
import { updateCart } from "../controller/cart.controller.js";
import { removeCart } from "../controller/cart.controller.js";
import { calculatePrice } from "../controller/cart.controller.js";
import { clearCart } from "../controller/cart.controller.js";

const router = express.Router();
router.post("/create",reg)
//Cart
router.post("/createCart",createCart);
router.put("/updateCart/:id",updateCart);
router.delete("/remove/:id",removeCart);
router.get("/calPrice",calculatePrice);
router.delete("/clear",clearCart);
export default router;