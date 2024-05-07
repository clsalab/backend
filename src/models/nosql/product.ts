import { Schema, model } from "mongoose";
import { Product } from "../../interfaces/product.interface";

const ProductSchema = new Schema<Product>(
{
    title: { type: String, required:true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    cantidad: { type: Number, required: true }, 
    images: { type: String, require: false }   
},
{
    timestamps: true,
    versionKey: false
}
);

const ProductModel = model('productos', ProductSchema);
export default ProductModel;
