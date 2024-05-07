import { Request, Response, NextFunction } from "express";
import { check } from "express-validator";

import { RequestExt } from "../interfaces/req-ext.interface";
import validateResults from "../utils/handleValidator";

const validatorCreateUser = [
    check("username").exists().notEmpty().isLength({ min: 3, max: 99 }),
    check("useremail").exists().notEmpty().isLength({ min: 3, max: 99 }),
    check("userpassword").exists().notEmpty().isLength({ min: 3, max: 99 }),
    check("userestado").exists().notEmpty(),
    check("userroles").exists().notEmpty(),
    (req: RequestExt, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    },
];

const validatorGetUser = [
    check("id").exists().notEmpty(),
    (req: RequestExt, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    },
];

export { validatorCreateUser, validatorGetUser };
