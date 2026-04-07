import cart from "../models/cart.models.js";
import { StatusCodes } from "http-status-pro-js";

export async function createCart(req,res){
    try{
        const{name,price,quantity} = req.body;
        let obj = new cart({id:Date.now(),name,price,quantity});
        const data =   await obj.save()
                return res.status(StatusCodes.CREATED.code).json({
                    code:StatusCodes.CREATED.code,
                    message:StatusCodes.CREATED.message,
                    data:data
                })

    }catch(err){
        console.log("create cart ",err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}

// update

export async function updateCart(req,res){
    try{
        const quantity = req.body;
        const id = req.params.id;
        ;
      const data = await cart.findOneAndUpdate(
           {id:id},
           quantity,
            { returnDocument: "after" }
        );
        if(data===null){
            return res.status(StatusCodes.NOT_FOUND.code).json({
                    code:StatusCodes.NOT_FOUND.code,
                    message:StatusCodes.NOT_FOUND.message,
                    data:data
                })
        }
                return res.status(StatusCodes.OK.code).json({
                    code:StatusCodes.OK.code,
                    message:StatusCodes.OK.message,
                    data:data
                })

    }catch(err){
        console.log("Update cart ",err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}

// remove

export async function removeCart(req,res){
    try{
        const id = req.params.id;
        
      const data = await cart.findOneAndDelete({id});
        if(data===null){
            return res.status(StatusCodes.NOT_FOUND.code).json({
                    code:StatusCodes.NOT_FOUND.code,
                    message:StatusCodes.NOT_FOUND.message,
                    data:data
                })
        }
                return res.status(StatusCodes.OK.code).json({
                    code:StatusCodes.OK.code,
                    message:StatusCodes.OK.message,
                    data:data
                })

    }catch(err){
        console.log("REmove cart ",err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}

// calculate price
export async function calculatePrice(req,res){
    try{
        const result = await cart.aggregate([
            {
                $group:{
                    _id:null,
                    total:{$sum:"$price"}
                }
            }
        ])
        console.log("total price of cart item ",result);
        return res.status(StatusCodes.OK.code).json({
                    code:StatusCodes.OK.code,
                    message:StatusCodes.OK.message,
                    data:{Total_price:result}
                    
                })
    }catch(err){
        console.log("total price cart ",err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}

// clear cart
export async function clearCart(req,res){
    try{
        const result = await cart.deleteMany({});
        if(result.deletedCount===0){
            
            return res.status(StatusCodes.BAD_REQUEST.code).json({
                    code:StatusCodes.BAD_REQUEST.code,
                    message:StatusCodes.BAD_REQUEST.message,
                    data:null
                })
        
        }
        console.log("total price of cart item ",result);
        return res.status(StatusCodes.OK.code).json({
                    code:StatusCodes.OK.code,
                    message:StatusCodes.OK.message,
                    data:result
                    
                })
    }catch(err){
        console.log("Clear cart ",err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}



