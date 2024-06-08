import { Response } from "express";
import { matchedData } from "express-validator";
import  teacherModel  from "../models/nosql/teacher";
import { handleHttp } from "../utils/error.handler";
import { RequestExt } from "../interfaces/req-ext.interface";
import { obtener_profesor, actualizar_profesor, eliminar_profesor, registerNewTeacher } from "../services/teacher.service";


// Obtener una lista de la BD
const getItems = async (req: RequestExt, res: Response) => {
    try {
        const user = req.user;
        const data = await teacherModel.find({});
        res.send({ data, user });
    } catch (e) {
        handleHttp(res, "ERROR_GET_TEACHER");
    }
};

// Obtener un detalle de la BD
const getItem = async ({ params }: RequestExt, res: Response) => {
    try {
        const { id } = params;
        const response = await obtener_profesor(id);
        const data = response ? response : "NOT_FOUND";
        res.send(data);
    } catch (e) {
        handleHttp(res, 'ERROR_GET_USER');
    }
};



// Controlador para el registro de usuarios
const registerCtrl = async (req: RequestExt, res: Response) => {
    try {
        // Extraer y validar los datos de la solicitud usando matchedData
        const requestData = matchedData(req) as any;
        
        // Registrar un nuevo usuario utilizando los datos validados
        const responseUser = await registerNewTeacher(requestData);
        
        // Enviar la respuesta al cliente
        res.send(responseUser);
    } catch (errors) {
        // Manejar errores
        console.error("Error en el registro de usuario:", errors);
        // Solo enviar una respuesta al cliente con el error
        res.status(500).send("Error interno del servidor.");
    }
};



const updateItem = async (req: RequestExt, res: Response) => {
    try {
        const { id } = req.params; // Obtener el ID del parámetro de la URL
        const { body } = req; // Obtener los datos de la solicitud

        // Acceder a req.user para obtener los datos del usuario que realiza la actualización
        const updatingUser = req.user;

        // Realizar la actualización y obtener los datos actualizados
        const response = await actualizar_profesor(id, body);

        if (!response) {
            return res.status(404).send("NOT_FOUND");
        }

        // Enviar los datos del usuario actualizado y del usuario que realizó la actualización
        res.send({ updatedUser: response, updatingUser });
    } catch (e: any) {
        handleHttp(res, 'ERROR_UPDATE_USER', e);
    }
};


// Eliminar un registro de la BD
const deleteItem = async (req: RequestExt, res: Response) => {
    try {
        const { id } = req.params;
        const updatingUser = req.user;
        const response = await eliminar_profesor(id);
        const data = response ? response : "NOT_FOUND";
        res.send({ deleteUser: data, updatingUser } ); // Corregir "updateUser" a "updatingUser"
    } catch (e) {
        handleHttp(res, 'ERROR_DELETE_TEACHER');
    }
}

    
export { getItems, getItem, registerCtrl, updateItem, deleteItem }; 
