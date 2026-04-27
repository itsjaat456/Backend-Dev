import { StatusCodes } from "http-status-pro-js";
import Portfolio from "../model/portfolio.js";
import Transaction from "../model/transaction.js";


//buy a stock
export async function addStock(req,res){

    let {stock_name,quantity,buy_price,current_price} = req.body;

    try{

        let exist = await Portfolio.findOne({
            user_id:req.user.id,
            stock_name:stock_name
        });

        if(exist){
            exist.quantity += quantity;
            exist.buy_price = buy_price;
            exist.current_price = current_price;

            await exist.save();
        }else{
            let obj = new Portfolio({
                user_id:req.user.id,
                stock_name,
                quantity,
                buy_price,
                current_price
            });

            await obj.save();
        }

        await Transaction.create({
            user_id:req.user.id,
            stock_name,
            type:"BUY",
            quantity,
            price:buy_price
        });

        return res.status(StatusCodes.CREATED.code).json({
            code:StatusCodes.CREATED.code,
            message:"Stock added",
            data:null
        })

    }catch(err){
        console.log("add stock ",err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}

// sell a stock
export async function sellStock(req,res){

    let {stock_name,quantity,current_price} = req.body;

    try{

        let stock = await Portfolio.findOne({
            user_id:req.user.id,
            stock_name
        });

        if(!stock){
            return res.status(StatusCodes.NOT_FOUND.code).json({
                code:StatusCodes.NOT_FOUND.code,
                message:"Stock not found",
                data:null
            })
        }

        if(stock.quantity < quantity){
            return res.status(StatusCodes.BAD_REQUEST.code).json({
                code:StatusCodes.BAD_REQUEST.code,
                message:"Not enough quantity",
                data:null
            })
        }

        stock.quantity -= quantity;
        stock.current_price = current_price;

        if(stock.quantity === 0){
            await stock.deleteOne();
        }else{
            await stock.save();
        }

        await Transaction.create({
            user_id:req.user.id,
            stock_name,
            type:"SELL",
            quantity,
            price:current_price
        });

        return res.status(StatusCodes.OK.code).json({
            code:StatusCodes.OK.code,
            message:"Stock sold",
            data:null
        })

    }catch(err){
        console.log("sell stock ",err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}

//update a stock
export async function updateStock(req,res){

    let {stock_id,quantity,current_price} = req.body;

    try{

        let stock = await Portfolio.findById(stock_id);

        if(!stock){
            return res.status(StatusCodes.NOT_FOUND.code).json({
                code:StatusCodes.NOT_FOUND.code,
                message:"Stock not found",
                data:null
            })
        }

        stock.quantity = quantity || stock.quantity;
        stock.current_price = current_price || stock.current_price;

        await stock.save();

        return res.status(StatusCodes.OK.code).json({
            code:StatusCodes.OK.code,
            message:"Stock updated",
            data:null
        })

    }catch(err){
        console.log("update stock ",err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}

// delete a stock

export async function deleteStock(req,res){

    let {stock_id} = req.body;

    try{

        let stock = await Portfolio.findById(stock_id);

        if(!stock){
            return res.status(StatusCodes.NOT_FOUND.code).json({
                code:StatusCodes.NOT_FOUND.code,
                message:"Stock not found",
                data:null
            })
        }

        await stock.deleteOne();

        return res.status(StatusCodes.OK.code).json({
            code:StatusCodes.OK.code,
            message:"Stock deleted",
            data:null
        })

    }catch(err){
        console.log("delete stock ",err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}