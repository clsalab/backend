import { RequestExt } from "../interfaces/req-ext.interface";
import ItemModel from "../models/nosql/item.model";

const inserOrder = async (item: RequestExt) => {
    try {
        // Intenta crear un nuevo ítem usando el modelo de Mongoose
        const respuestaInsercion = await ItemModel.create(item);
        return respuestaInsercion;
    } catch (error: any) {
        // Si ocurre un error de validación de Mongoose
        if (error.name === 'ValidationError') {
            // Puedes manejar los errores de validación aquí
            // Por ejemplo, registrar el error o lanzar un error personalizado
            throw new Error('Se produjo un error de validación: ' + error.message);
        } else {
            // Para otros tipos de errores, re-lanzarlos
            throw error;
        }
    }
};

const getOrders = async () => {
    const responseItem = await ItemModel.find({});
    return responseItem;
};

const getOrder = async (id:string) => {
    const responseItem = await ItemModel.findOne({ _id: id });
    return responseItem;
};

const updateOrder = async (id: string, data: RequestExt ) => {
    const responseItem = await ItemModel.findOneAndUpdate({ _id:id}, data, {
        new:true,
    });
    return responseItem;
}
const deleteOrder = async (id:string)=> {
    const responseItem = await ItemModel.deleteOne({ _id: id });
    return responseItem;
}
export { inserOrder, getOrders, getOrder, updateOrder, deleteOrder};
