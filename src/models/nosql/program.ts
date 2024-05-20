import { Schema, model } from "mongoose";
import { Program } from "../../interfaces/program";
import MongooseDelete from "mongoose-delete";

const ProgramSchema = new Schema<Program>(
{
    codigoPrograma: { type: Number, required:true },
    nombrePrograma: { type: String, required: true },
    tipoPrograma: { type: String, required: true },
    intensidadHora: { type: String, required: true }, 
    descripcionPrograma: { type: String, require: false },   
    Asignaturas: { type: String, require: false },   
    codigoSede: { type: Number, require: false }   
},
{
    timestamps: true,
    versionKey: false
}
);

ProgramSchema.plugin(MongooseDelete, {  overrideMethods: "all"  });

const programModel = model<Program>('ProgramaFormación', ProgramSchema);

export default programModel;
