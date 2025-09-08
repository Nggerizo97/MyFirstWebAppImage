import { Router } from "express";
import { createOrder, getOrders, updateOrderStatus } from "../controllers/order";
import validateToken from "./validateToken";

const router = Router();

router.post('/', validateToken, createOrder);
router.get('/', validateToken, getOrders);
router.put('/:id/status', validateToken, updateOrderStatus);

export default router;