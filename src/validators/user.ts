import { Request, Response, NextFunction } from "express";
import { check } from "express-validator";

import { RequestExt } from "../interfaces/req-ext.interface";
import validateResults from "../utils/handleValidator";

const validatorCreateUser = [
    check("username").exists().notEmpty().isLength({ min: 3, max: 99 }),
    check("useremail").exists().notEmpty().isEmail(),
    check("userpassword").exists().notEmpty().isLength({ min: 3, max: 99 }),
    check("userestado").exists().notEmpty(),
    check("userroles").exists().notEmpty(),
    check("tipoDocumento").exists().notEmpty(),
    check("fechaNacimiento").exists().notEmpty(),
    check("numeroDocumento").exists().notEmpty().isLength({ min: 6, max: 11 }),
    check("documentoIdentidad").exists().notEmpty(), // Validación básica, ajustar según el tipo de dato
    check("paisExpedicion").exists().notEmpty(),
    check("departamentoExpedicion").exists().notEmpty(),
    check("municipioExpedicion").exists().notEmpty(),
    check("fechaExpedicion").exists().notEmpty(),
    check("nombres").exists().notEmpty(),
    check("apellidos").exists().notEmpty(),
    check("sexo").exists().notEmpty(),
    check("direccion").exists().notEmpty(),
    check("celular").exists().notEmpty(),
    check("paisNacimiento").exists().notEmpty(),
    check("departamentoNacimiento").exists().notEmpty(),
    check("municipioNacimiento").exists().notEmpty(),
    check("estrato").exists().isIn([1,2,3,4,5,6,7,8,9]),
    check("ficha").exists(),
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
