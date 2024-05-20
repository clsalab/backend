import { Request, Response, NextFunction } from "express";
import { check } from "express-validator";
import validateResults from "../utils/handleValidator";

const validatorCreateSemester = [
    check("codigoSemestre").exists().notEmpty().isLength({ min: 3, max: 9999 }),
    check("semestre").exists().notEmpty(),
    check("ano").exists().notEmpty(),
    check("descipcionSemestre").exists().notEmpty(),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    },
];

const validatorGetSemester = [
    check("id").exists().notEmpty(),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    },
];

export { validatorCreateSemester, validatorGetSemester};
