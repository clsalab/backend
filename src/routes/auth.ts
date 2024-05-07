// auth.ts
import { Router } from "express";
import { registerCtrl, loginCtrl } from "../controllers/auth";
import { validatorLogin, validatorRegisterItem } from "../validators/auth";

const router = Router();

router.post("/register", validatorRegisterItem, registerCtrl);
router.post("/login", validatorLogin, loginCtrl);

export default router;