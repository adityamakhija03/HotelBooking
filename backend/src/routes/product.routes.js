import express from 'express';
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from './product.controller.js';

const router = express.Router();

router.get('/AllProducts', getAllProducts);
router.get('/id', getProductById);
router.post('/createProduct', createProduct);
router.patch('/idupdate', updateProduct);
router.delete('/id', deleteProduct);

export default router;
