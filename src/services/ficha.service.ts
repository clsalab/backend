import { Ficha } from "../interfaces/ficha.interface";
import fichaModel from "../models/nosql/ficha";

const inserFicha = async (item: Ficha) => {
    try {
        // Intenta crear un nuevo ítem usando el modelo de Mongoose
        const respuestaInsercion = await fichaModel.create(item);
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

const getFichas = async () => {
    const responseItem = await fichaModel.find({});
    return responseItem;
};

const getFicha = async (id:string) => {
    const responseItem = await fichaModel.findOne({ _id: id });
    return responseItem;
};

const updateFicha = async (id: string, data: Ficha ) => {
    const responseItem = await fichaModel.findOneAndUpdate({ _id:id}, data, {
        new:true,
    });
    return responseItem;
}
const deleteFicha = async (id:string)=> {
    const responseItem = await fichaModel.deleteOne({ _id: id });
    return responseItem;
}
export { inserFicha, getFichas, getFicha, updateFicha, deleteFicha};
