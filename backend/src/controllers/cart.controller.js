import { Cart } from '../models/cart.model.js';

// Controller to add item to cart
 const addToCart = async (req, res) => {
    try {
        const { user, product, quantity, pricing } = req.body;
        const cartItem = new Cart({
            user,
            product,
            quantity,
            pricing
        });
        const savedCartItem = await cartItem.save();
        res.status(201).json(savedCartItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller to get all items in the cart for a specific user
 const getCartItems = async (req, res) => {
    try {
        const userId = req.params.userId;
        const cartItems = await Cart.find({ user: userId });
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to remove an item from the cart
 const removeFromCart = async (req, res) => {
    try {
        const itemId = req.params.itemId;
        await Cart.findByIdAndRemove(itemId);
        res.status(200).json({ message: 'Item removed from cart successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to update the quantity of an item in the cart
 const updateCartItemQuantity = async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const { quantity } = req.body;
        const updatedCartItem = await Cart.findByIdAndUpdate(itemId, { quantity }, { new: true });
        res.status(200).json(updatedCartItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to clear all items from the cart for a specific user
 const clearCart = async (req, res) => {
    try {
        const userId = req.params.userId;
        await Cart.deleteMany({ user: userId });
        res.status(200).json({ message: 'Cart cleared successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {clearCart,updateCartItemQuantity,removeFromCart,getCartItems,addToCart}