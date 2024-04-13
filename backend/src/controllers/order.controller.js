import {Order} from "../models/order.model.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {Cart} from "../models/cart.model.js"
import mongoose from "mongoose"

const CreateOrder = asyncHandler(async(res,req) => {


    try {
        const order = new Order(req.body);
        const result = await order.save();
    
         if(!result){
          throw new ApiError(400,"Failed to create your Order");
            }

        // Count the total number of orders placed by the user within the last 3 months
        const total = await Order.countDocuments({ user: req.user, orderAt: { $gte: Date.now() - (3 * 30 * 24 * 60 * 60 * 1000) } });
        
        return res.status(201).json(
            new ApiResponse(200, result, "Order created Successfully")
        )

    }catch (error) {
        next(error);
    }
});


const GetOrderHistory = asyncHandler(async(res,req) => {
    
   try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const endDate = parseInt(req.query.endDate);
    const orderSearch = req.query.orderSearch && req.query.orderSearch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const skipData = (page - 1) * limit;

    const total = awaitOrder.countDocuments({
        user: req.user,
        orderAt: { $gte: endDate },
        $or: [
            { _id: mongoose.isValidObjectId(orderSearch) ? orderSearch : null },
            { "orderItems.productName": { $regex: new RegExp(orderSearch, 'i') } },
            { "orderItems.product": mongoose.isValidObjectId(orderSearch) ? orderSearch : null },
            { "payment.paymentMethods": { $regex: new RegExp(orderSearch, 'i') } },
        ]
    });

    const result = awaitOrder.find({
        user: req.user,
        orderAt: { $gte: endDate },
        $or: [
            { _id: mongoose.isValidObjectId(orderSearch) ? orderSearch : null },
            { "orderItems.productName": { $regex: new RegExp(orderSearch, 'i') } },
            { "orderItems.product": mongoose.isValidObjectId(orderSearch) ? orderSearch : null },
            { "payment.paymentMethods": { $regex: new RegExp(orderSearch, 'i') } },
        ]
    }).limit(limit).skip(skipData).select('-payment.paymentId -delivery -shippingInfo -pricing').sort({ _id: -1 });
    
    if(!result){
        throw new ApiError(404,"Order not found");
    }

    return res.status(201).json(
        new ApiResponse(200, result, "Your Order History")
    )

   } catch (error) {
    next(error);
   } 
});



    const getOrderById = asyncHandler(async(res,req)=>{
        try {
        const _id = req.params.id;

        // Find the order by ID for the authenticated user
        const result = awaitOrder.findOne({ _id, user: req.user }).select('-payment.paymentId -delivery');
        
        if (!result) {
            throw new ApiError(404,"Order Not Found");
        }
        
        return res.status(201).json(
            new ApiResponse(200,result, "Your Order Details")
        )  

        } catch (error) {
            next(error);
        }
    });


  const confirmOrderPayment  =   asyncHandler(async(res,req)=>{
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        // Extract payment ID and status from request body
        const { paymentId, status } = req.body;

        // Check if payment ID and status are valid
        if (!paymentId || !status || status !== 'succeeded') {
            throw new ApiError(403,"You are not allowed to access this route");
        }
        // const result = awaitOrder.findOneAndUpdate(
        //     { "payment.paymentId": paymentId, user: req.user },
        //     {
        //         $set: {
        //             "payment.status": status,
        //             "payment.message": "Payment Succeeded"
        //         }
        //     },
        //     {
        //         new: true,
        //         session
        //     }
        // ).select('-payment.paymentId -delivery');

        // if (!result) {
        //     throw new ApiError(404, "Order not found or payment details not updated);
        // }

        const result = await Order.findOneAndUpdate(
            { "payment.paymentId": paymentId, user: req.user },
            {
                $set: {
                    "payment.status": status,
                    "payment.message": "Payment Succeeded"
                }
            },
            {
                new: true,
                session
            }
        ).select('-payment.paymentId -delivery');
        
        if (!result) {
            throw new ApiError(404, "Order not found or payment details not updated");
        }
        



        const deleteCartPromises = result.orderItems.map(async (items) => {
            const deleteCartInfo = await Cart.findOneAndDelete(
                { product: items.product, user: req.user },
                { session }
            );
            if (!deleteCartInfo) {
                throw new Error("Cart not found.");
            }
        });
        
        await Promise.all(deleteCartPromises);

        const redisKeys = [
            // `${process.env.REDIS_VERCEL_KV_DB}:${req.user}:${req.orderToken}:cartOrProducts`,
            // `${process.env.REDIS_VERCEL_KV_DB}:${req.user}:${req.orderToken}:shipping`,
            // `${process.env.REDIS_VERCEL_KV_DB}:${req.user}:${req.orderToken}:pricing`,
            // `${process.env.REDIS_VERCEL_KV_DB}:${req.user}:${req.orderToken}:payment`
        ];

        await Promise.all(deleteRedisPromises);

        // Cleanup task: Remove order session
        res.clearCookie('orderSession', {
            sameSite: 'none',
            secure: true
        });

        // Commit transaction
        await session.commitTransaction();

        return res.status(201).json(
            new ApiResponse(200,result, "Payment Succeeded")
        )  



    } catch (error) {
        await session.abortTransaction();
        next(error);
    }finally {
        // End session
        await session.endSession();
    }
});


    const getLastOrder = asyncHandler(async(res,req)=>{
        try {
            // Find the last order placed by the authenticated user
            const result = await Order.find({ user: req.user }).sort({ _id: -1 }).limit(1).select('-payment.paymentId -delivery -shippingInfo -pricing');
    
            // If no order found, throw an error
            if (!result) {
                const error = new Error("Order not found.");
                error.statusCode = 404;
                throw error;
            }
    
            // Prepare response data
            const info = {
                status: true,
                message: "Your Last Order.",
                result
            };
    
            // Send response with last order details
            res.status(200).send(info);
        } catch (error) {
            next(error);
        } 
    });





export {CreateOrder,getLastOrder,getOrderById,confirmOrderPayment,GetOrderHistory}