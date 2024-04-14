import {Router} from 'express';
import { addAddress, getAddressList, getAddressById, updateAddress, deleteAddress, getDefaultAddress } from '../controllers/address.contoller.js';
import {Auth} from '../middlewares/auth.middleware.js';

const router = Router();

router.use(Auth);

router.route('/address')
    .post(addAddress)
    .get(getAddressList);

router.route('/address/:id')
    .get(getAddressById)
    .patch(updateAddress)
    .delete(deleteAddress);

router.get('/default/address', getDefaultAddress);

export default router;
