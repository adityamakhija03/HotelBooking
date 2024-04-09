import { Cart } from '../models/cart.model.js';

 const addToCart = async (req, res, next) => {
    try {
        const newCartItem = new Cart(req.body);
        const result = await newCartItem.save().then(t => t.populate(["product", "user"])).then(t => t);

        const info = {
            status: true,
            message: "Product added to cart",
            result
        };

        res.status(200).send(info);
    } catch (error) {
        next(error);
    }
};

 const getCartItems = async (req, res, next) => {
    try {
        const userId = req.user; // Assuming user information is available in the request
        const result = await Cart.find({ user: userId }).populate('product', '_id productName price discount stock images');

        if (!result || result.length === 0) {
            const error = new Error("No Results Found");
            error.statusCode = 404;
            throw error;
        }

        const info = {
            status: true,
            message: "List of cart items.",
            result
        };

        res.status(200).send(info);
    } catch (error) {
        next(error);
    }
};

 const getCartItemById = async (req, res, next) => {
    try {
        const cartItemId = req.params.id;
        const result = await Cart.findOne({ _id: cartItemId }).populate('product', '_id productName price discount stock images');

        if (!result) {
            const error = new Error("No Results Found");
            error.statusCode = 404;
            throw error;
        }

        const info = {
            status: true,
            message: "Cart item retrieved successfully",
            result
        };

        res.status(200).send(info);
    } catch (error) {
        next(error);
    }
};

 const updateCartItemById = async (req, res, next) => {
    try {
        const cartItemId = req.params.id;
        const updatedCartItem = await Cart.findByIdAndUpdate(cartItemId, req.body, { new: true }).populate('product', '_id productName price discount stock images');

        if (!updatedCartItem) {
            const error = new Error("No Results Found");
            error.statusCode = 404;
            throw error;
        }

        const info = {
            status: true,
            message: "Cart item updated successfully",
            result: updatedCartItem
        };

        res.status(200).send(info);
    } catch (error) {
        next(error);
    }
};

 const deleteCartItemById = async (req, res, next) => {
    try {
        const cartItemId = req.params.id;
        const deletedCartItem = await Cart.findByIdAndDelete(cartItemId);

        if (!deletedCartItem) {
            const error = new Error("No Results Found");
            error.statusCode = 404;
            throw error;
        }

        const info = {
            status: true,
            message: "Cart item deleted successfully",
            result: deletedCartItem
        };

        res.status(200).send(info);
    } catch (error) {
        next(error);
    }
};

 const isProductAddedToCart = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const userId = req.user; // Assuming user information is available in the request
        const result = await Cart.findOne({ user: userId, product: productId });

        const info = {
            status: !!result, // Convert result to boolean
            message: result ? "Product is in the cart." : "Product is not in the cart.",
            result
        };

        res.status(200).send(info);
    } catch (error) {
        next(error);
    }
};

export {addToCart,isProductAddedToCart,deleteCartItemById,updateCartItemById,getCartItemById,getCartItems} 