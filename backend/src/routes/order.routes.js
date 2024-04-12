import {Router} from "express";
import {Auth} from "../middlewares/auth.middleware.js";
import { CreateOrder,getLastOrder,getOrderById,GetOrderHistory,confirmOrderPayment} from "../controllers/order.controller.js";

const router = Router();
router.use(Auth);

router.route('/orders')
    .post(CreateOrder)
    .get(GetOrderHistory)
    .patch(confirmOrderPayment); //? This route is only accessible when payments are confirmed 

router.route('/orders/:id')
    .get(getOrderById);

router.route('/last/order')
    .get(getLastOrder);


    export default router;
