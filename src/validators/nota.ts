import { Request, Response, NextFunction } from "express";
import { check } from "express-validator";
import validateResults from "../utils/handleValidator";

const validatorCreateNota = [
    check("nombreAsignatura").exists().notEmpty(),
    check("nota1").exists().notEmpty(),
    check("nota2").exists().notEmpty(),
    check("nota3").exists().notEmpty(),
    check("notaD").exists().notEmpty(),
    check("descripcion").exists().notEmpty(),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    },
];

const validatorGetNota = [
    check("id").exists().notEmpty(),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    },
];

export { validatorCreateNota, validatorGetNota};
