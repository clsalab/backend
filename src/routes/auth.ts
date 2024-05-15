// auth.ts
import { Router } from "express";
import { registerCtrl, loginCtrl } from "../controllers/auth";
import { validatorLogin, validatorRegisterItem } from "../validators/auth";
import { handleValidationErrors } from "../utils/handleValidationErrors";

const router = Router();

router.post("/register", validatorRegisterItem,handleValidationErrors, registerCtrl);
router.post("/login", validatorLogin, loginCtrl);

export default router;