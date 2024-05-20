import { Semester } from "../interfaces/semester";
import semesterModel from "../models/nosql/semester";

const inserSemester = async (item: Semester) => {
    try {
        // Intenta crear un nuevo ítem usando el modelo de Mongoose
        const respuestaInsercion = await semesterModel.create(item);
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

const getSemesters = async () => {
    const responseItem = await semesterModel.find({});
    return responseItem;
};

const getSemester = async (id:string) => {
    const responseItem = await semesterModel.findOne({ _id: id });
    return responseItem;
};

const updateSemester = async (id: string, data: Semester ) => {
    const responseItem = await semesterModel.findOneAndUpdate({ _id:id}, data, {
        new:true,
    });
    return responseItem;
}
const deleteSemester = async (id:string)=> {
    const responseItem = await semesterModel.deleteOne({ _id: id });
    return responseItem;
}
export { inserSemester, getSemesters, getSemester, updateSemester, deleteSemester};
