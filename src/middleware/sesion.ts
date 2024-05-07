import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt.handle";
import { JwtPayload } from "jsonwebtoken";
import { RequestExt } from "../interfaces/req-ext.interface";
import { getUserRolesByEmail } from "../services/user.service"; // Importa una función para obtener los roles del usuario

const checkJwt = async (req: RequestExt, res: Response, next: NextFunction) => {
    try {
        const jwtByUser = req.headers.authorization || "";
        const jwt = jwtByUser.split(' ').pop();
        const token = `${jwt}`;
        const isUser: JwtPayload | string = await verifyToken(token);
        if (typeof isUser === 'string') {
            res.status(401).send("NO_TIENES_PERMISO_SUFICIENTE_JWT");
        } else {
            req.user = isUser;

            // Obtén los roles del usuario usando el correo electrónico (id) del token JWT
            const userRoles = await getUserRolesByEmail(isUser.id);
            if (userRoles) {
                // Si se encuentran los roles del usuario, añádelos a req.user
                req.user.userroles = userRoles;
                next();
            } else {
                // Si no se pueden recuperar los roles del usuario, envía un error
                res.status(401).send("NO_SE_PUEDEN_RECUPERAR_LOS_ROLES_DEL_USUARIO");
            }
        }
    } catch (e) {
        res.status(400).send("SESSION_NO_VALIDAD");
    }
};

export { checkJwt };
