import { Router } from "express";
import { getProduct } from "../controllers/product";
import validateToken from "./validateToken";

const router = Router();

router.get('/', validateToken ,getProduct)

export default router;