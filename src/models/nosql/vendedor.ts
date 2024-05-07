import { Schema, model } from "mongoose";
import { Vendedor } from "../../interfaces/vendedor.interface";

const VendedorSchema = new Schema<Vendedor>(
{
    tpDoc: { type: String,
        enum: ["Tarjeta Identidad" , "Cedula Ciudadanía", "Pasaporte", "Otro"],
        required:true,
    },
    document: {
        type: Number,
        required: true
    },
    names: {
        type: String,
        required: true
    },
    surnames: {
        type: String,
        required: true
    },
    cel: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    images: {
        type: String,
        required: true
    },

},
{
    timestamps: true,
    versionKey: false
}
);

const VendedorModel = model('vendedores', VendedorSchema);
export default VendedorModel;
