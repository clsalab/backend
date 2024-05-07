import { Request, Response, NextFunction } from "express";
import { check } from "express-validator";
import validateResults from "../utils/handleValidator";

const validatorCreateItem = [
    check("name").exists().notEmpty().isLength({ min: 3, max: 99 }),
    check("color").exists().notEmpty().isLength({ min: 3, max: 99 }),
    check("gas").exists().notEmpty().isLength({ min: 3, max: 99 }),
    check("year").exists().notEmpty().isInt(),
    check("price").exists().notEmpty().isInt(),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    },
];

const validatorGetItem = [
    check("id").exists().notEmpty(),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    },
];

export { validatorCreateItem, validatorGetItem };
