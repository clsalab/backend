import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

import { RequestExt } from "../interfaces/req-ext.interface";

const validateResults = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const arrErrors = errors.array();
        console.log('Error de validación de datos - INVALID VALUE: ', arrErrors);
        const errorMessage = 'Error de validación de datos - INVALID VALUE: ';
        return res.status(400).json({ errors: errorMessage, arrErrors});
    }
    next();
};




const validatorRegisterItem = [
    check("username").exists().notEmpty().isLength({ min: 3, max: 99 }),
    check("useremail").exists().notEmpty().isEmail(),
    check("userpassword").exists().notEmpty().isLength({ min: 3, max: 15 }),
    check("userroles"),
    check("tipoDocumento").exists().notEmpty(),
    check("fechaNacimiento").exists().notEmpty(),
    check("numeroDocumento").exists().notEmpty().isLength({ min: 6, max: 11 }),
    check("documentoIdentidad").exists(),
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
    check("estrato").exists().notEmpty().isIn([1,2,3,4,5,6,7,8,9]),
    (req: RequestExt, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    },
];

const validatorLogin = [
    check("useremail").exists().notEmpty().isEmail(),
    check("userpassword").exists().notEmpty().isLength({ min: 3, max: 15 }),
    (req: RequestExt, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    },
];

export { validatorRegisterItem, validatorLogin };
