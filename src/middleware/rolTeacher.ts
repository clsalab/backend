import { NextFunction, Response } from "express";
import { RequestExt } from "../interfaces/req-ext.interface";
import { JwtPayload } from "jsonwebtoken";
import { getUserRolesByEmail } from "../services/user.service";


const checkTeacher = async (req: RequestExt, res: Response, next: NextFunction) => {
    const user = req.user as JwtPayload | { id: string };

    try {
        // Verifica si el usuario tiene el rol de administrador
        if (user && 'id' in user) {
            const userRoles = await getUserRolesByEmail(user.id);

            // Verifica si el usuario tiene el rol de administrador
            if (userRoles && userRoles.includes('teacher')) {
                console.log("Usuario con rol de profesor:", user);
                next(); // Usuario con rol de administrador, permite el acceso
            } else {
                // Si el usuario no tiene el rol de administrador, envía un mensaje de error
                res.status(403).send("NO_TIENES_PERMISO_COMO_PROFESOR");
            }
        } else {
            // Si no se puede obtener el ID del usuario, envía un mensaje de error
            res.status(403).send("NO_TIENES_PERMISO_COMO_PROFESOR");
        }
    } catch (error) {
        console.error("Error al verificar el rol de profesor:", error);
        res.status(500).send("Error interno del servidor.");
    }




}





export default checkTeacher ;
