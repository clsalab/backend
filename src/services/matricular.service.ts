import { Program } from "../interfaces/programa.interface";
import programModel from "../models/nosql/program";

const inserProgram = async (item: Program) => {
    try {
        // Intenta crear un nuevo ítem usando el modelo de Mongoose
        const respuestaInsercion = await programModel.create(item);
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

const getPrograms = async () => {
    const responseItem = await programModel.find({});
    return responseItem;
};

const getProgram = async (id:string) => {
    const responseItem = await programModel.findOne({ _id: id });
    return responseItem;
};

const updateProgram = async (id: string, data: Program ) => {
    const responseItem = await programModel.findOneAndUpdate({ _id:id}, data, {
        new:true,
    });
    return responseItem;
}
const deleteProgram = async (id:string)=> {
    const responseItem = await programModel.deleteOne({ _id: id });
    return responseItem;
}
export { inserProgram, getPrograms, getProgram, updateProgram, deleteProgram};
