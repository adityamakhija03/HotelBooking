import express from 'express';
import { addAddress, getAddressList, getAddressById, updateAddress, deleteAddress, getDefaultAddress } from '../controllers/address.contoller.js';
import auth from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(auth);

router.route('/address')
    .post(addAddress)
    .get(getAddressList);

router.route('/address/:id')
    .get(getAddressById)
    .patch(updateAddress)
    .delete(deleteAddress);

router.get('/default/address', getDefaultAddress);

export default router;
