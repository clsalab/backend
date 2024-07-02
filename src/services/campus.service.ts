import { Campus } from "../interfaces/sede.interface";
import campusModel from "../models/nosql/campus";

const inserCampus = async (item: Campus) => {
    try {
        // Intenta crear un nuevo ítem usando el modelo de Mongoose
        const respuestaInsercion = await campusModel.create(item);
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

const getCampuss = async () => {
    const responseItem = await campusModel.find({});
    return responseItem;
};

const countCampus = async () => {
    const countItem = await campusModel.find({}).countDocuments();
    return countItem;
};

const getCampus = async (id:string) => {
    const responseItem = await campusModel.findOne({ _id: id });
    return responseItem;
};

const updateCampus = async (id: string, data: Campus ) => {
    const responseItem = await campusModel.findOneAndUpdate({ _id:id}, data, {
        new:true,
    });
    return responseItem;
}
const deleteCampus = async (id:string)=> {
    const responseItem = await campusModel.deleteOne({ _id: id });
    return responseItem;
}
export { inserCampus, getCampuss, countCampus, getCampus, updateCampus, deleteCampus};
