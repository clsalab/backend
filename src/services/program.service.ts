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

const countPrograms = async () => {
    const responseItem = await programModel.find({}).countDocuments();
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

const getAllProgramsWithSubjects = async () => {
    try {
        const programasConAsignaturas = await programModel.aggregate([
            {
                $lookup: {
                    from: 'asignaturas', // Nombre de la colección de Asignatura
                    localField: 'asignaturas', // Campo local de Programa
                    foreignField: '_id', // Campo foráneo de Asignatura
                    as: 'asignaturas' // Nombre del nuevo campo que contendrá las asignaturas
                }
            },
            { $unwind: '$asignaturas'},
        ]);
        return programasConAsignaturas;
    } catch (error) {
        throw error;
    }
};

export { inserProgram, getPrograms, countPrograms, getProgram, updateProgram, deleteProgram, getAllProgramsWithSubjects};
