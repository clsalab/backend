import { Response } from "express";
import { matchedData } from "express-validator";
import  fichaModel  from "../models/nosql/ficha";
import { handleHttp } from "../utils/error.handler";
import { RequestExt } from "../interfaces/req-ext.interface";
import { deleteFicha, getFicha, getFichas, inserFicha, updateFicha } from "../services/ficha.service";


// Obtener una lista de la BD
const getItems = async (req: RequestExt, res: Response) => {
    try {
        const user = req.user;
        const data = await getFichas();
        res.send({ data, user });
    } catch (e) {
        handleHttp(res, "ERROR_GET_FichaS");
    }
};



// Obtener un detalle de la BD
const getItem = async ({ params }: RequestExt, res: Response) => {
    try {
        const { id } = params;
        const response = await getFicha(id);
        const data = response ? response : "NOT_FOUND";
        res.send(data);
    } catch (e) {
        handleHttp(res, 'ERROR_GET_Ficha');
    }
};



// Insertar un registro en la BD
const postItem = async ({ body }: RequestExt, res: Response) => {
    try {
        
        const responseItem = await inserFicha(body);
        res.send(responseItem);
    } catch (e: any) { // Añade ': any' después de 'e'
        if (e.name === 'ValidationError') {
            handleHttp(res, 'VALIDATION_ERROR', e.message);
        } else {
            handleHttp(res, 'ERROR_POST_ITEM', e);
        }
    }
}


const updateItem = async (req: RequestExt, res: Response) => {
    try {
        const { id } = req.params; // Obtener el ID del parámetro de la URL
        const { body } = req; // Obtener los datos de la solicitud

        // Acceder a req.Ficha para obtener los datos del usuario que realiza la actualización
        const updatingUser = req.user;

        // Realizar la actualización y obtener los datos actualizados
        const response = await updateFicha(id, body);

        if (!response) {
            return res.status(404).send("NOT_FOUND");
        }

        // Enviar los datos del usuario actualizado y del usuario que realizó la actualización
        res.send({ updatedUser: response, updatingUser });
    } catch (e: any) {
        handleHttp(res, 'ERROR_UPDATE_Ficha', e);
    }
};


// Eliminar un registro de la BD
const deleteItem = async (req: RequestExt, res: Response) => {
    try {
        const { id } = req.params;
        const updatingUser = req.user;
        const response = await deleteFicha(id);
        const data = response ? response : "NOT_FOUND";
        res.send({ deleteFicha: data, updatingUser } ); // Corregir "updateUser" a "updatingUser"
    } catch (e) {
        handleHttp(res, 'ERROR_DELETE_Ficha');
    }
}

    
export { getItems, getItem, postItem, updateItem, deleteItem }; 
