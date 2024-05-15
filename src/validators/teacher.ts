import { Response, NextFunction } from "express";
import { check } from "express-validator";
import { RequestExt } from "../interfaces/req-ext.interface";
import validateResults from "../utils/handleValidator";

const validatorCreateTeacher = [
    check("username").exists().notEmpty().isLength({ min: 3, max: 99 }),
    check("useremail").exists().notEmpty().isEmail(),
    check("userpassword").exists().notEmpty().isLength({ min: 3, max: 99 }),
    check("userestado").exists().notEmpty(),
    check("userroles").exists().notEmpty(),
    check("tipoDocumento").exists().notEmpty(),
    check("fechaNacimiento").exists().notEmpty(),
    check("numeroDocumento").exists().notEmpty(),
    check("documentoIdentidad").exists(), // Validación básica, ajustar según el tipo de dato
    check("paisExpedicion").exists().notEmpty(),
    check("departamentoExpedicion").exists().notEmpty(),
    check("municipioExpedicion").exists().notEmpty(),
    check("fechaExpedicion").exists().notEmpty(),
    check("nombres").exists().notEmpty(),
    check("apellidos").exists().notEmpty(),
    check("sexo").exists().notEmpty(),
    check("paisNacimiento").exists().notEmpty(),
    check("departamentoNacimiento").exists().notEmpty(),
    check("municipioNacimiento").exists().notEmpty(),
    check("estrato").exists().isInt({ min: 1, max: 6 }),
    (req: RequestExt, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    },
];

const validatorGetTeacher = [
    check("id").exists().notEmpty(),
    (req: RequestExt, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    },
];

export { validatorCreateTeacher, validatorGetTeacher };
