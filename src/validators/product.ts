import { Request, Response, NextFunction } from "express";
import { check } from "express-validator";
import validateResults from "../utils/handleValidator";

const validatorCreateProduct = [
    check("title").exists().notEmpty().isLength({ min: 3, max: 99 }),
    check("description").exists().notEmpty().isLength({ min: 3, max: 99 }),
    check("price").exists().notEmpty(),
    check("cantidad").exists().notEmpty(),
    check("images").exists().notEmpty(),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    },
];

const validatorGetProduct = [
    check("id").exists().notEmpty(),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    },
];

export { validatorCreateProduct, validatorGetProduct };
