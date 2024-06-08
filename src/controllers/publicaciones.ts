import { Response } from "express";
import { matchedData } from "express-validator";
import  publicacionesModel  from "../models/nosql/modeloPublicaciones";
import { handleHttp } from "../utils/error.handler";
import { RequestExt } from "../interfaces/req-ext.interface";
import { deletePublicacion, getPublicacion, getPublicacions, inserPublicacion, updatePublicacion } from "../services/publicaciones.service";
import { publicacionConUsuario } from "../services/publicaciones.service";


// Controlador para obtener las publicaciones con información del usuario autor
export const obtenerPublicacionesConUsuario = async (req: RequestExt, res: Response) => {
    try {
        const user = req.user;
        const data = await publicacionConUsuario();
        res.send({data, user});
        } catch (error) {
        console.error('Error al obtener las publicaciones con usuario:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
        }
    };

// Obtener una lista de la BD
const getItems = async (req: RequestExt, res: Response) => {
    try {
        const user = req.user;
        const data = await getPublicacions();
        res.send({ data, user });
    } catch (e) {
        handleHttp(res, "ERROR_GET_PublicacionS");
    }
};



// Obtener un detalle de la BD
const getItem = async ({ params }: RequestExt, res: Response) => {
    try {
        const { id } = params;
        const response = await getPublicacion(id);
        const data = response ? response : "NOT_FOUND";
        res.send(data);
    } catch (e) {
        handleHttp(res, 'ERROR_GET_Publicacion');
    }
};



// Insertar un registro en la BD
const postItem = async ({ body }: RequestExt, res: Response) => {
    try {
        const user = body.user; 
        const responseItem = await inserPublicacion(body);
        res.send({responseItem, user});
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

        // Acceder a req.Publicacion para obtener los datos del usuario que realiza la actualización
        const updatingUser = req.user;

        // Realizar la actualización y obtener los datos actualizados
        const response = await updatePublicacion(id, body);

        if (!response) {
            return res.status(404).send("NOT_FOUND");
        }

        // Enviar los datos del usuario actualizado y del usuario que realizó la actualización
        res.send({ updatedUser: response, updatingUser });
    } catch (e: any) {
        handleHttp(res, 'ERROR_UPDATE_Publicacion', e);
    }
};


// Eliminar un registro de la BD
const deleteItem = async (req: RequestExt, res: Response) => {
    try {
        const { id } = req.params;
        const updatingUser = req.user;
        const response = await deletePublicacion(id);
        const data = response ? response : "NOT_FOUND";
        res.send({ deletePublicacion: data, updatingUser } ); // Corregir "updateUser" a "updatingUser"
    } catch (e) {
        handleHttp(res, 'ERROR_DELETE_Publicacion');
    }
}

    
export { getItems, getItem, postItem, updateItem, deleteItem }; 
