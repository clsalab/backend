import { Car } from "../interfaces/car.interface";
import ItemModel from "../models/nosql/item.model";

const inserCars = async (item: Car) => {
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

const getCars = async () => {
    const responseItem = await ItemModel.find({});
    return responseItem;
};

const getCar = async (id:string) => {
    const responseItem = await ItemModel.findOne({ _id: id });
    return responseItem;
};

const updateCar = async (id: string, data: Car ) => {
    const responseItem = await ItemModel.findOneAndUpdate({ _id:id}, data, {
        new:true,
    });
    return responseItem;
}
const deleteCar = async (id:string)=> {
    const responseItem = await ItemModel.deleteOne({ _id: id });
    return responseItem;
}
export { inserCars, getCars, getCar, updateCar, deleteCar};
