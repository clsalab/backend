import { Request, Response, NextFunction } from "express";
import { check } from "express-validator";
import validateResults from "../utils/handleValidator";

const validatorCreateCampus = [
    check("codigoSede").exists().notEmpty(),
    check("nombreSede").exists().notEmpty(),
    check("descriptionSede").exists().notEmpty(),
    check("municipio").exists().notEmpty(),
    check("departamento").exists().notEmpty(),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    },
];

const validatorGetCampus = [
    check("id").exists().notEmpty(),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    },
];

export { validatorCreateCampus, validatorGetCampus };
