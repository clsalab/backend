import { Schema, model } from "mongoose";
import { Campus } from "../../interfaces/sede.interface";
import MongooseDelete from "mongoose-delete";

const CampusSchema = new Schema<Campus>(
{
    codigoSede: { type: Number, required:true },
    descriptionSede: { type: String, required: true },
    nombreSede: { type: String, required: true },
    municipio: { type: String, required: true }, 
    departamento: { type: String, require: true },     
},
{
    timestamps: true,
    versionKey: false
}
);



CampusSchema.plugin(MongooseDelete, { overrideMethods: "all" });

const campusModel = model<Campus>('sede', CampusSchema);

export default campusModel;