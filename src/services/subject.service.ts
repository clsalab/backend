import { Subject } from "../interfaces/subject";
import SubjectModel from "../models/nosql/subject";

const inserSubject = async (item: Subject) => {
    try {
        // Intenta crear un nuevo ítem usando el modelo de Mongoose
        const respuestaInsercion = await SubjectModel.create(item);
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

const getSubjects = async () => {
    const responseItem = await SubjectModel.find({});
    return responseItem;
};

const getSubject = async (id:string) => {
    const responseItem = await SubjectModel.findOne({ _id: id });
    return responseItem;
};

const updateSubject = async (id: string, data: Subject ) => {
    const responseItem = await SubjectModel.findOneAndUpdate({ _id:id}, data, {
        new:true,
    });
    return responseItem;
}
const deleteSubject = async (id:string)=> {
    const responseItem = await SubjectModel.deleteOne({ _id: id });
    return responseItem;
}
export { inserSubject, getSubjects, getSubject, updateSubject, deleteSubject};
