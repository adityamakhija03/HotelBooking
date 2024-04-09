import {Router} from "express";


import {addToCart,isProductAddedToCart,deleteCartItemById,updateCartItemById,getCartItemById,getCartItems} from "../controllers/cart.controller.js"


const router = Router()

router.route('/carts')
    .post(addToCart)
    .get(getCartItems);


router.route('/carts/:id')
    .get(getCartItemById)
    .patch(updateCartItemById)
    .delete(deleteCartItemById);

router.route('/isPlantsAddedToCart/:plantId')
    .get(isProductAddedToCart);
    

export default router;    





