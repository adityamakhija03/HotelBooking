import { Router } from "express";
export{
    createSeller,
    getSellerById,
    updateSeller,
    deleteSeller
} from "../controllers/user.controller.js";

const router = Router()

router.route("/createSeller").post(createSeller);
router.route("/getSellerById").get(getSellerById);
router.route("/updateSeller").patch(updateSeller);   //instead of using patch we cn use put but put will entirely change and patch changes partially
router.route("/deleteSeller").delete(deleteSeller);
export default router 
