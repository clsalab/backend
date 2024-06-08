import { Publicacion } from "../interfaces/publicaciones.interface";
import publicacinesModel from "../models/nosql/modeloPublicaciones";

const inserPublicacion = async (item: Publicacion) => {
    try {
        // Intenta crear un nuevo ítem usando el modelo de Mongoose
        const respuestaInsercion = await publicacinesModel.create(item);
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

const getPublicacions = async () => {
    const responseItem = await publicacinesModel.find({});
    return responseItem;
};

const getPublicacion = async (id:string) => {
    const responseItem = await publicacinesModel.findOne({ _id: id });
    return responseItem;
};

const updatePublicacion = async (id: string, data: Publicacion ) => {
    const responseItem = await publicacinesModel.findOneAndUpdate({ _id:id}, data, {
        new:true,
    });
    return responseItem;
}
const deletePublicacion = async (id:string)=> {
    const responseItem = await publicacinesModel.deleteOne({ _id: id });
    return responseItem;
}

const publicacionConUsuario = async () => {
    const resultado= await publicacinesModel.aggregate(
        [
        {
            $lookup:
            {
                from: "users",
                localField: "username",
                foreignField:"_id",
                as: "usuarioAuthor"
            }
        },
        { $unwind: "$usuarioAuthor"},
        { $match: { title:"Mi post!"}}
        ]
    )
}

export { publicacionConUsuario, inserPublicacion, getPublicacions, getPublicacion, updatePublicacion, deletePublicacion};
