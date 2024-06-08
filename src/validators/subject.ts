import { Request, Response, NextFunction } from "express";
import { check } from "express-validator";
import validateResults from "../utils/handleValidator";

const validatorCreateSubject = [
    check("codigoAsignatura").exists().notEmpty(),
    check("nombreAsignatura").exists().notEmpty(),
    check("tipoAsignatura").exists().notEmpty(),
    check("intensidadHora").exists().notEmpty(),
    check("descriptionAsignatura").exists().notEmpty(),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    },
];

const validatorGetSubject = [
    check("id").exists().notEmpty(),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    },
];

export { validatorCreateSubject, validatorGetSubject};
