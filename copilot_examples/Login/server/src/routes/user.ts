import { Router } from "express";
import { loginUser, newUser } from '../controllers/user';
import validateToken from "./validateToken";

const router = Router();

router.post('/', newUser)
router.post('/login',loginUser)

export default router;