import { Router } from "express";
import { getProduct, getPublicProducts, getProductById } from "../controllers/product";
import validateToken from "./validateToken";

const router = Router();

router.get('/', validateToken, getProduct);
router.get('/public', getPublicProducts); // Public route for gallery
router.get('/:id', getProductById); // Public route for individual product

export default router;