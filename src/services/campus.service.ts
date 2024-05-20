import { Car } from "../interfaces/car.interface";
import CarsModel from "../models/nosql/item.model";

const inserCampus = async (item: Car) => {
    try {
        // Intenta crear un nuevo ítem usando el modelo de Mongoose
        const respuestaInsercion = await CarsModel.create(item);
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
    const responseItem = await CarsModel.find({});
    return responseItem;
};

const getCampus = async (id:string) => {
    const responseItem = await CarsModel.findOne({ _id: id });
    return responseItem;
};

const updateCampus = async (id: string, data: Car ) => {
    const responseItem = await CarsModel.findOneAndUpdate({ _id:id}, data, {
        new:true,
    });
    return responseItem;
}
const deleteCampus = async (id:string)=> {
    const responseItem = await CarsModel.deleteOne({ _id: id });
    return responseItem;
}
export { inserCampus, getCampuss, getCampus, updateCampus, deleteCampus};
