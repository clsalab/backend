import { Response } from "express";
import { matchedData } from "express-validator";
import  programModel  from "../models/nosql/program";
import { handleHttp } from "../utils/error.handler";
import { RequestExt } from "../interfaces/req-ext.interface";
import { deleteProgram, getProgram, getPrograms, inserProgram, updateProgram } from "../services/program.service";


// Obtener una lista de la BD
const getItems = async (req: RequestExt, res: Response) => {
    try {
        const user = req.user;
        const data = await getPrograms();
        res.send({ data, user });
    } catch (e) {
        handleHttp(res, "ERROR_GET_ProgramS");
    }
};



// Obtener un detalle de la BD
const getItem = async ({ params }: RequestExt, res: Response) => {
    try {
        const { id } = params;
        const response = await getProgram(id);
        const data = response ? response : "NOT_FOUND";
        res.send(data);
    } catch (e) {
        handleHttp(res, 'ERROR_GET_Program');
    }
};



// Insertar un registro en la BD
const postItem = async ({ body }: RequestExt, res: Response) => {
    try {
        
        const responseItem = await inserProgram(body);
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

        // Acceder a req.Program para obtener los datos del usuario que realiza la actualización
        const updatingUser = req.user;

        // Realizar la actualización y obtener los datos actualizados
        const response = await updateProgram(id, body);

        if (!response) {
            return res.status(404).send("NOT_FOUND");
        }

        // Enviar los datos del usuario actualizado y del usuario que realizó la actualización
        res.send({ updatedUser: response, updatingUser });
    } catch (e: any) {
        handleHttp(res, 'ERROR_UPDATE_Program', e);
    }
};


// Eliminar un registro de la BD
const deleteItem = async (req: RequestExt, res: Response) => {
    try {
        const { id } = req.params;
        const updatingUser = req.user;
        const response = await deleteProgram(id);
        const data = response ? response : "NOT_FOUND";
        res.send({ deleteProgram: data, updatingUser } ); // Corregir "updateUser" a "updatingUser"
    } catch (e) {
        handleHttp(res, 'ERROR_DELETE_Program');
    }
}

/* const listaAsignaturaPrograma = async () => {
    const resultado: any = await programModel.aggregate(
        [
            {
                $lookup:
                {
                    from: "asignaturas",
                }
            }
        ]
    )
    console.log('****** RESULTADOS ******', resultado)
} */

    
export { getItems, getItem, postItem, updateItem, deleteItem }; 
