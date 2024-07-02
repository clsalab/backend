import { Nota } from "../interfaces/notas";
import notaModel from "../models/nosql/nota";

const inserNota = async (item: Nota) => {
    try {
        // Intenta crear un nuevo ítem usando el modelo de Mongoose
        const respuestaInsercion = await notaModel.create(item);
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

const getNotas = async () =>{
    const responseItem = await notaModel.find({});
    return responseItem;
};

const getNota = async (id:string) => {
    const responseItem = await notaModel.findOne({ _id: id });
    return responseItem;
};

const updateNota = async (id: string, data: Nota ) => {
    const responseItem = await notaModel.findOneAndUpdate({ _id:id}, data, {
        new:true,
    });
    return responseItem;
}
const deleteNota = async (id:string)=> {
    const responseItem = await notaModel.deleteOne({ _id: id });
    return responseItem;
}

const getAllDocenteNota = async () => {
    try {
        const docenteNota = await notaModel.aggregate([
            {
                $lookup: {
                    from: 'users', // Nombre de la colección de Asignatura
                    localField: 'profesor', // Campo local de Nota
                    foreignField: '_id', // Campo foráneo de Asignatura
                    as: 'profesor' // Nombre del nuevo campo que contendrá las asignaturas
                }
            },
            { $unwind: '$profesor'},
        ]);
        return docenteNota;
    } catch (error) {
        throw error;
    }
};

export { inserNota, getNotas, getNota, updateNota, deleteNota, getAllDocenteNota};
