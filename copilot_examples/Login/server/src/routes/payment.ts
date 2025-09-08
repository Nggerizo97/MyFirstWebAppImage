import { Router } from "express";
import { processPayment, createPaymentIntent } from "../controllers/payment";
import validateToken from "./validateToken";

const router = Router();

router.post('/process', validateToken, processPayment);
router.post('/create-intent', validateToken, createPaymentIntent);

export default router;