import { Schema, model } from "mongoose";
import { Program } from "../../interfaces/program";
import MongooseDelete from "mongoose-delete";

const ProgramSchema = new Schema<Program>(
    {
        codigoPrograma: { type: Number, required: true },
        nombrePrograma: { type: String, required: true },
        tipoPrograma: { type: String, required: true },
        intensidadHora: { type: String, required: true },
        descripcionPrograma: { type: String, required: false }, // Corregido el error tipográfico
    },
    {
        timestamps: true,
        versionKey: false
    }
);

ProgramSchema.plugin(MongooseDelete, { overrideMethods: "all" });

const programModel = model<Program>('Programa', ProgramSchema);

export default programModel;
