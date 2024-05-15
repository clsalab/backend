import { Response } from "express";
import { matchedData } from "express-validator";
import  usersModel  from "../models/nosql/user";
import { handleHttp } from "../utils/error.handler";
import { RequestExt } from "../interfaces/req-ext.interface";
import { deleteUser, getUser, updateUser } from "../services/user.service";


// Obtener una lista de la BD
const getItems = async (req: RequestExt, res: Response) => {
    try {
        const user = req.user;
        const data = await usersModel.find({});
        res.send({ data, user });
    } catch (e) {
        handleHttp(res, "ERROR_GET_USERS");
    }
};

// Obtener un detalle de la BD
const getItem = async ({ params }: RequestExt, res: Response) => {
    try {
        const { id } = params;
        const response = await getUser(id);
        const data = response ? response : "NOT_FOUND";
        res.send(data);
    } catch (e) {
        handleHttp(res, 'ERROR_GET_USER');
    }
};



// Insertar un registro en la BD
const createItem = async (req: RequestExt, res: Response) => {
    try {
        const body = matchedData(req); // Limpiar la data
        const user = req.user;
        const data = new usersModel(body);
        await data.save();
        res.send({ data, user });
    } catch (e) {
        handleHttp(res, "ERROR_CREATE_USER");
    }
};


const updateItem = async (req: RequestExt, res: Response) => {
    try {
        const { id } = req.params; // Obtener el ID del parámetro de la URL
        const { body } = req; // Obtener los datos de la solicitud

        // Acceder a req.user para obtener los datos del usuario que realiza la actualización
        const updatingUser = req.user;

        // Realizar la actualización y obtener los datos actualizados
        const response = await updateUser(id, body);

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
        const response = await deleteUser(id);
        const data = response ? response : "NOT_FOUND";
        res.send({ deleteUser: data, updatingUser } ); // Corregir "updateUser" a "updatingUser"
    } catch (e) {
        handleHttp(res, 'ERROR_DELETE_USER');
    }
}

    
export { getItems, getItem, createItem, updateItem, deleteItem }; 
