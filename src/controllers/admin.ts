import { Response } from "express";
import { matchedData } from "express-validator";
import  usersModel  from "../models/nosql/user";
import { handleHttp } from "../utils/error.handler";
import { RequestExt } from "../interfaces/req-ext.interface";
import { deleteUser, getUser, updateUser } from "../services/user.service";
import { inserSubject, getSubject, updateSubject, deleteSubject } from "../services/subject.service";
import SubjectModel from "../models/nosql/subject";





// Obtener una lista Asignatura de la BD
const getItemsSubjects = async (req: RequestExt, res: Response) => {
    try {
        const user = req.user;
        const data = await SubjectModel.find({});
        res.send({ data, user });
    } catch (e) {
        handleHttp(res, "ERROR_GET_SUBJECTS");
    }
};


// Obtener una Asignatura de la BD
const getItemSubject = async ({ params }: RequestExt, res: Response) => {
    try {
        const { id } = params;
        const response = await getSubject(id);
        const data = response ? response : "NOT_FOUND";
        res.send(data);
    } catch (e) {
        handleHttp(res, 'ERROR_GET_SUBJECT');

    }
};

    // Insertar un registro en la BD
    const postItemSubject = async ({ body }: RequestExt, res: Response) => {
        try {
            
            const responseItem = await inserSubject(body);
            res.send(responseItem);
        } catch (e: any) {
            if (e.name === 'ValidationError') {
                handleHttp(res, 'VALIDATION_ERROR', e.message);
            } else {
                handleHttp(res, 'ERROR_POST_ITEM_SUBJECT', e);
            }
        }
    };


const updateItemSubjects = async (req: RequestExt, res: Response) => {
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
        res.send({ updatedSubject: response, updatingUser });
    } catch (e: any) {
        handleHttp(res, 'ERROR_UPDATE_SUBJECT', e);
    }
};


// Eliminar un registro de la BD
const deleteItemSubject = async (req: RequestExt, res: Response) => {
    try {
        const { id } = req.params;
        const updatingUser = req.user;
        const response = await deleteSubject(id);
        const data = response ? response : "NOT_FOUND";
        res.send({ deleteSubject: data, updatingUser } ); // Corregir "updateUser" a "updatingUser"
    } catch (e) {
        handleHttp(res, 'ERROR_DELETE_SUBJECT');
    }
};











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

    
export { getItemsSubjects, getItemSubject,postItemSubject, updateItemSubjects, deleteItemSubject, getItems, getItem, createItem, updateItem, deleteItem }; 
