import {Router} from 'express';
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from './product.controller.js';

const router = Router();

router.route("/AllProducts").get( getAllProducts);
router.route("/id").get(getProductById);
router.route("/createProduct").post(createProduct);
router.route("/idupdate").patch(updateProduct);
router.route("/id").delete(deleteProduct);

export default router;
