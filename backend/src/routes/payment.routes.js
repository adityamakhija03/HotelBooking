import {Router} from 'express';
import {Auth} from '../middlewares/auth.middleware.js';
import {orderAuth} from '../middleware/orderAuth.js';
import { createOrderSession, getOrderSession, addShippingInfo, getShippingInfo, confirmOrder, processPayment, getStripePublicKey } from '../controllers/paymentController.js';

const router = Router();

router.use(Auth);

// checkout routes
router.post("/", createOrderSession);

// authentication order session
router.use(orderAuth);

router.get("/", getOrderSession);

// checkout -> shipping routes
router.route('/shipping')
    .post(addShippingInfo)
    .get(getShippingInfo);

// checkout -> confirm routes
router.get('/confirm', confirmOrder);

export default router;
