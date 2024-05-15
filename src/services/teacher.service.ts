import { Teacher } from "../interfaces/teacher.interface";
import teachersModel from "../models/nosql/teacher";

const inserTeacher = async (item: Teacher) => {
    try {
        // Intenta crear un nuevo ítem usando el modelo de Mongoose
        const respuestaInsercion = await teachersModel.create(item);
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

const getTeachers = async () => {
    const responseItem = await teachersModel.find({});
    return responseItem;
};

const getTeacher = async (id:string) => {
    const responseItem = await teachersModel.findOne({ _id: id });
    return responseItem;
};

const updateTeacher = async (id: string, data: Teacher ) => {
    const responseItem = await teachersModel.findOneAndUpdate({ _id:id}, data, {
        new:true,
    });
    return responseItem;
}
const deleteTeacher = async (id:string)=> {
    const responseItem = await teachersModel.deleteOne({ _id: id });
    return responseItem;


}

export { inserTeacher, getTeachers, getTeacher, updateTeacher, deleteTeacher};
