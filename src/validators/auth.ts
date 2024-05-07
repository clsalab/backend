import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

import { RequestExt } from "../interfaces/req-ext.interface";

const validateResults = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const validatorRegisterItem = [
    check("username").exists().notEmpty().isLength({ min: 3, max: 99 }),
    check("useremail").exists().notEmpty().isEmail(),
    check("userpassword").exists().notEmpty().isLength({ min: 3, max: 15 }),
    check("userroles"),
    (req: RequestExt, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    },
];

const validatorLogin = [
    check("useremail").exists().notEmpty().isEmail(),
    check("userpassword").exists().notEmpty().isLength({ min: 3, max: 15 }),
    (req: RequestExt, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    },
];

export { validatorRegisterItem, validatorLogin };
