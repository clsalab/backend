import { Product } from "../interfaces/product.interface";
import ProductModel from "../models/nosql/product";

const inserProduct = async (item: Product) => {
    try {
        /* Intenta crear un nuevo ítem usando el modelo de Mongoose */
        const respuestaInsercion = await ProductModel.create(item);
        return respuestaInsercion;
    } catch (error: any) {
      /*   Si ocurre un error de validación de Mongoose */
        if (error.name === 'ValidationError') {
           /*  Puedes manejar los errores de validación aquí */
           /*  Por ejemplo, registrar el error o lanzar un error personalizado */
            throw new Error('Se produjo un error de validación: ' + error.message);
        } else {
            // Para otros tipos de errores, re-lanzarlos 
            throw error;
        }
    }
};

const getProducts = async () => {
    const responseItem = await ProductModel.find({});
    return responseItem;
};

const getProduct = async (id:string) => {
    const responseItem = await ProductModel.findOne({ _id:id });
    return responseItem;
};
const updateProduct = async (id: string, data: Product ) => {
    const responseItem = await ProductModel.findOneAndUpdate({ _id:id}, data, {
        new:true,
    });
    return responseItem;
}
const deleteProduct = async (id:string)=> {
    const responseItem = await ProductModel.deleteOne({ _id: id });
    return responseItem;
}

export { inserProduct, getProducts, getProduct, updateProduct, deleteProduct };
