import { Request, Response, NextFunction } from "express";
import { check } from "express-validator";
import validateResults from "../utils/handleValidator";

const validatorCreateVendedor = [
    check("tpDoc").exists().notEmpty().isLength({ min: 3, max: 99 }),
    check("document").exists().notEmpty().isLength({ min: 3, max: 99 }),
    check("names").exists().notEmpty().isLength({ min: 3, max: 99 }),
    check("surnames").exists().notEmpty().isLength({ min: 3, max: 99 }),
    check("cel").exists().notEmpty().isLength({ min: 7, max: 15 }),
    check("email").exists().notEmpty().isLength({ min: 3, max: 99 }),
    check("address").exists().notEmpty().isLength({ min: 3, max: 99 }),
    check("images").exists().notEmpty(),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    },
];

const validatorGetVendedor = [
    check("id").exists().notEmpty(),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    },
];

export { validatorCreateVendedor, validatorGetVendedor };
