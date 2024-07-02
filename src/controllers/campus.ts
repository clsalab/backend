import { Response } from "express";
import { matchedData } from "express-validator";
import { handleHttp } from "../utils/error.handler";
import { RequestExt } from "../interfaces/req-ext.interface";
import { countCampus, deleteCampus, getCampus, getCampuss, inserCampus, updateCampus } from "../services/campus.service";
import { filtrarFichasPorSede } from "../utils/functionFiltrar";


// Obtener una lista de las sedes
const getItemsCampus = async (req: RequestExt, res: Response) => {
    try {
        const data = await getCampuss();
        res.json( data );
    } catch (e) {
        handleHttp(res, "ERROR_GET_CAMPUSS");
    }
};

// Contar las sedes
const getCountCampus = async (req: RequestExt, res: Response) => {
    try{
        const data = await countCampus();
        res.json( data  );
    } catch (e) {
        handleHttp(res, "ERROR_GET_COUNT_CAMPUS");
    }
        
};

// Obtener un detalle de una sede
const getItemCampus = async ({ params }: RequestExt, res: Response) => {
    try {
        const { id } = params;
        const response = await getCampus(id);
        const data = response ? response : "NOT_FOUND";
        res.send(data);
    } catch (e) {
        handleHttp(res, 'ERROR_GET_CAMPUS');
    }
};



// Insertar un registro en la BD
const postItemCampus = async ({ body }: RequestExt, res: Response) => {
    try {
        
        const responseItem = await inserCampus(body);
        res.send(responseItem);
    } catch (e: any) { // Añade ': any' después de 'e'
        if (e.name === 'ValidationError') {
            handleHttp(res, 'VALIDATION_ERROR', e.message);
        } else {
            handleHttp(res, 'ERROR_POST_CAMPUS', e);
        }
    }
}


const updateItemCampus = async (req: RequestExt, res: Response) => {
    try {
        const { id } = req.params; // Obtener el ID del parámetro de la URL
        const { body } = req; // Obtener los datos de la solicitud

        // Acceder a req.user para obtener los datos del usuario que realiza la actualización
        const updatingUser = req.user;

        // Realizar la actualización y obtener los datos actualizados
        const response = await updateCampus(id, body);

        if (!response) {
            return res.status(404).send("NOT_FOUND");
        }

        // Enviar los datos del usuario actualizado y del usuario que realizó la actualización
        res.send({ updatedUser: response, updatingUser });
    } catch (e: any) {
        handleHttp(res, 'ERROR_UPDATE_CAMPUS', e);
    }
};


// Eliminar un registro de la BD
const deleteItemCampus = async (req: RequestExt, res: Response) => {
    try {
        const { id } = req.params;
        const updatingUser = req.user;
        const response = await deleteCampus(id);
        const data = response ? response : "NOT_FOUND";
        res.send({ deleteUser: data, updatingUser } ); // Corregir "updateUser" a "updatingUser"
    } catch (e) {
        handleHttp(res, 'ERROR_DELETE_CAMPUS');
    }
}

export const filtrarFichasPorSedeController = (req: RequestExt, res: Response) => {
    try {
        const fichas: any[] = [];
        const { nombreSede } = req.params; // Obtén el nombre de sede de los parámetros de la URL
        // Suponiendo que 'fichas' es un array de objetos con la estructura que has proporcionado
        // Filtra las fichas por nombre de sede
        const fichasFiltradas = filtrarFichasPorSede(fichas, nombreSede);
        res.json(fichasFiltradas);
    } catch (error) {
        console.error('Error al filtrar las fichas por sede:', error);
        res.status(500).json({ message: 'Error al filtrar las fichas por sede' });
    }
};


    
export { getItemsCampus, getCountCampus, getItemCampus, postItemCampus, updateItemCampus, deleteItemCampus }; 
