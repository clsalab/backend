import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handler";
import { Vendedor } from "../interfaces/vendedor.interface";
import { inserVendedor } from "../services/vendedor.service";
import { matchedData } from "express-validator";

const getVendedor = (req: Request, res: Response) => {
    try {
        // Implementación de la función
    } catch (e) {
        handleHttp(res, 'ERROR_GET_VENDEDOR');
    }
}

const getVendedors = (req: Request, res: Response) => {
    try {
        // Implementación de la función
    } catch (e) {
        handleHttp(res, 'ERROR_GET_VENDEDORS');
    } 
}

const updateVendedor = (req: Request, res: Response) => {
    try {
        // Implementación de la función
    } catch (e) {
        handleHttp(res, 'ERROR_UPDATE_VENDEDOR');
    }
}

const postVendedor = async ({body}: Request, res: Response) => {
    try {
        
        const responseItem = await inserVendedor(body);
        res.send(responseItem);
    } catch (e: any) { // Añade ': any' después de 'e'
        if (e.name === 'ValidationError') {
            handleHttp(res, 'VALIDATION_ERROR', e.message);
        } else {
            handleHttp(res, 'ERROR_POST_ITEM', e);
        }
    }
}

const deleteVendedor = (req: Request, res: Response) => {
    try {
        // Implementación de la función
    } catch (e) {
        handleHttp(res, 'ERROR_DELETE_VENDEDOR');
    }
}

export { getVendedor, getVendedors, updateVendedor, postVendedor, deleteVendedor };
