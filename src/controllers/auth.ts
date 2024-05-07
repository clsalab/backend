import { Request, Response } from "express";
import { registerNewUser, loginUser } from "../services/auth.service";
import { matchedData } from "express-validator";

// Controlador para el registro de usuarios
const registerCtrl = async (req: Request, res: Response) => {
    try {
        // Extraer y validar los datos de la solicitud usando matchedData
        const requestData = matchedData(req) as any;
        
        // Registrar un nuevo usuario utilizando los datos validados
        const responseUser = await registerNewUser(requestData);
        
        // Enviar la respuesta al cliente
        res.send(responseUser);
    } catch (error) {
        // Manejar errores
        console.error("Error en el registro de usuario:", error);
        res.status(500).send("Error interno del servidor.");
    }
};

// Controlador para el inicio de sesión de usuarios
const loginCtrl = async (req: Request, res: Response) => {
    try {
        // Extraer y validar los datos de la solicitud usando matchedData
        const requestData = matchedData(req) as any;
        const { useremail, userpassword } = requestData;

        // Iniciar sesión del usuario con los datos validados
        const responseUser = await loginUser({ useremail, userpassword });

        // Manejar la respuesta del servicio de inicio de sesión
        if (responseUser.error) {
            // Si hay un error durante el inicio de sesión
            if (responseUser.error === "PASSWORD_INCORRECT") {
                res.status(403).send(responseUser.error);
            } else if (responseUser.error === "NOT_FOUND_USER") {
                res.status(404).send(responseUser.error);
            } else {
                res.status(500).send("Error interno del servidor.");
            }
        } else {
            // Si el inicio de sesión es exitoso
            res.send(responseUser);
        }
    } catch (error) {
        // Manejar errores
        console.error("Error al procesar la solicitud de inicio de sesión:", error);
        res.status(500).send("Error interno del servidor.");
    }
};

export { registerCtrl, loginCtrl };
