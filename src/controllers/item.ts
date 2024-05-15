import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handler";
import { inserCar, getCar, getCars, updateCar, deleteCar } from "../services/item.service"; 

const getItem = async ({ params }: Request, res: Response) => {
    try {
        const { id } = params;
        const response = await getCar(id);
        const data = response ? response : "NOT_FOUND";
        res.send(data);
    } catch (e) {
        handleHttp(res, 'ERROR_GET_ITEM');
    }
};

const getItems = async (req: Request, res: Response) => {
    try {
        const response = await getCars();
        res.send(response);
    } catch (e) {
        handleHttp(res, 'ERROR_GET_ITEMS');
    }
}

const updateItem = async ({ params, body }: Request, res: Response) => {
    try {
        const { id } = params;
        const response = await updateCar(id, body);
        const data = response ? response : "NOT_FOUND";
        res.send(data);
    } catch (e: any) { // Añade ': any' después de 'e'
        handleHttp(res, 'ERROR_UPDATE_ITEM', e);
    }
}

const postItem = async ({ body }: Request, res: Response) => {
    try {
        
        const responseItem = await inserCar(body);
        res.send(responseItem);
    } catch (e: any) { // Añade ': any' después de 'e'
        if (e.name === 'ValidationError') {
            handleHttp(res, 'VALIDATION_ERROR', e.message);
        } else {
            handleHttp(res, 'ERROR_POST_ITEM', e);
        }
    }
}


const deleteItem = async ({ params }: Request, res: Response) => {
    try {
        const { id } = params;
        const response = await deleteCar(id);
        const data = response ? response : "NOT_FOUND";
        res.send(data);
    } catch (e) {
        handleHttp(res, 'ERROR_DELETE_ITEM');
    }
}

export { getItem, getItems, updateItem, postItem, deleteItem };
