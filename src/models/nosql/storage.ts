import { Schema, model, Document } from "mongoose";
import { Storage } from "../../interfaces/storage.interface";

// Definir el tipo para el modelo de almacenamiento
interface StorageModelInterface extends Storage, Document {}

const StorageSchema = new Schema<StorageModelInterface>(
{
    fileName: { type: String },
    path: { type: String },
    idUser: { type: String }
},
{
    timestamps: true,
    versionKey: false
}
);

const StorageModel = model<StorageModelInterface>('storage_', StorageSchema);
export default StorageModel;
