import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handler";
import { inserProduct, getProduct, getProducts, updateProduct, deleteProduct } from "../services/product.service";

const getItems = async (req: Request, res: Response) => {
    try {
        const response = await getProducts();
        res.send(response);
    } catch (e) {
        handleHttp(res, 'ERROR_GET_ITEMS');
    }
}

const getItem = async ({ params }: Request, res: Response) => {
    try {
        const { id } = params;
        const response = await getProduct(id);
        const data = response ? response : "NOT_FOUND";
        res.send(data);
    } catch (e) {
        handleHttp(res, 'ERROR_GET_ITEM');
    }
};

const postItem = async ({ body }: Request, res: Response) => {
    try {
        
        const responseItem = await inserProduct(body);
        res.send(responseItem);
    } catch (e: any) {
        if (e.name === 'ValidationError') {
            handleHttp(res, 'VALIDATION_ERROR', e.message);
        } else {
            handleHttp(res, 'ERROR_POST_ITEM', e);
        }
    }
}

const updateItem = async ({ params, body }: Request, res: Response) => {
    try {
        const { id } = params;
        
        const response = await updateProduct(id, body);
        const data = response ? response : "NOT_FOUND";
        res.send(data);
    } catch (e) {
        handleHttp(res, 'ERROR_UPDATE_ITEM');
    }
}

const deleteItem = async ({ params }: Request, res: Response) => {
    try {
        const { id } = params;
        const response = await deleteProduct(id);
        const data = response ? response : "NOT_FOUND";
        res.send(data);
    } catch (e) {
        handleHttp(res, 'ERROR_DELETE_ITEM');
    }
}

export { getItems, getItem, postItem, updateItem, deleteItem };
