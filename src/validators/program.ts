import { Request, Response, NextFunction } from "express";
import { check } from "express-validator";
import validateResults from "../utils/handleValidator";

const validatorCreateProgram = [
    check("codigoPrograma").exists().notEmpty(),
    check("nombrePrograma").exists().notEmpty(),
    check("tipoPrograma").exists().notEmpty(),
    check("intensidadHoraPrograma").exists().notEmpty(),
    check("descripcionPrograma").exists().notEmpty(),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    },
];

const validatorGetProgram = [
    check("id").exists().notEmpty(),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    },
];

export { validatorCreateProgram, validatorGetProgram};
