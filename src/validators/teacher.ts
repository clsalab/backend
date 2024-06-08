import { Response, NextFunction } from "express";
import { check } from "express-validator";
import { RequestExt } from "../interfaces/req-ext.interface";
import validateResults from "../utils/handleValidator";

const validatorCreateTeacher = [
    check("useremail").exists().notEmpty().isEmail(),
    check("userpassword").exists().notEmpty().isLength({ min: 3, max: 99 }),
    check("username").exists().notEmpty().isLength({ min: 3, max: 99 }),
    check("userestado").exists().notEmpty().isIn(['active', 'inactive']),
    check("userroles").exists().notEmpty().isArray(),
    check("tipoDocumento").exists().notEmpty(),
    check("fechaNacimiento").exists().notEmpty().isISO8601(),
    check("numeroDocumento").exists().notEmpty().isInt(),
    check("documentoIdentidad").exists().notEmpty(),
    check("paisExpedicion").exists().notEmpty(),
    check("departamentoExpedicion").exists().notEmpty(),
    check("municipioExpedicion").exists().notEmpty(),
    check("fechaExpedicion").exists().notEmpty().isISO8601(),
    check("nombres").exists().notEmpty(),
    check("apellidos").exists().notEmpty(),
    check("sexo").exists().notEmpty().isIn(['masculino', 'femenino']),
    check("paisNacimiento").exists().notEmpty(),
    check("departamentoNacimiento").exists().notEmpty(),
    check("municipioNacimiento").exists().notEmpty(),
    check("estrato").exists().notEmpty().isInt({ min: 1, max: 6 }),
    check("cargo").exists().notEmpty(),
    check("tituloAcademico").exists().notEmpty(),
    check("perfilLaboral").exists().notEmpty(),
    check("anoExperiencia").exists().notEmpty(),
    check("direccion").optional(), // Campo opcional
    check("celular").optional(), // Campo opcional
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
