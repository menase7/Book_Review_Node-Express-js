import { Router } from "express";
import * as authControllers from "../controllers/auth_user.js";

const router = Router();

router.post("/auth/login", authControllers.login);
router.post("/auth/register", authControllers.register);


export default router;