import { Response } from "express";
import { matchedData } from "express-validator";
import  SubjectModel  from "../models/nosql/subject";
import { handleHttp } from "../utils/error.handler";
import { RequestExt } from "../interfaces/req-ext.interface";
import { deleteSubject, getCountSubjects, getSubject, getSubjects, inserSubject, updateSubject } from "../services/subject.service";


// Obtener una lista de la BD
const getItems = async (req: RequestExt, res: Response) => {
    try {
        const user = req.user;
        const data = await getSubjects();
        res.send({ data, user });
    } catch (e) {
        handleHttp(res, "ERROR_GET_USERS");
    }
};

// Contar una asignaturas
const getCountItems = async (req: RequestExt, res: Response) => {
    try {
        const data = await getCountSubjects();
        res.json( data );
    } catch (e) {
        handleHttp(res, "ERROR_GET_COUNT_USERS");
    }
};

// Obtener un detalle de la BD
const getItem = async ({ params }: RequestExt, res: Response) => {
    try {
        const { id } = params;
        const response = await getSubject(id);
        const data = response ? response : "NOT_FOUND";
        res.send(data);
    } catch (e) {
        handleHttp(res, 'ERROR_GET_USER');
    }
};



// Insertar un registro en la BD
const postItem = async ({ body }: RequestExt, res: Response) => {
    try {
        const responseItem = await inserSubject(body);
        if (responseItem) {
            res.send(responseItem);
        } else {
            handleHttp(res, 'ERROR_POST_ITEM', 'No se pudo insertar el elemento');
        }
    } catch (e: any) {
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

        // Acceder a req.user para obtener los datos del usuario que realiza la actualización
        const updatingUser = req.user;

        // Realizar la actualización y obtener los datos actualizados
        const response = await updateSubject(id, body);

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
        const response = await deleteSubject(id);
        const data = response ? response : "NOT_FOUND";
        res.send({ deleteSubject: data, updatingUser } ); // Corregir "updateUser" a "updatingUser"
    } catch (e) {
        handleHttp(res, 'ERROR_DELETE_USER');
    }
}

    
export { getItems, getCountItems, getItem, postItem, updateItem, deleteItem }; 
