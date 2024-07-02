import mongoose, { Schema, model } from "mongoose";
import { Program } from "../../interfaces/programa.interface";
import MongooseDelete from "mongoose-delete";
import { Nota } from "../../interfaces/notas";





const NotaSchema = new Schema<Nota>(
    {   
        nombreAsignatura: { type: String, required: true },
        nota1: { type: String },
        nota2: { type: String },
        nota3: { type: String },
        notaD: { type: String },
        descripcion: { type: String },
        profesor: { type: String },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

NotaSchema.plugin(require('mongoose-autopopulate'));


NotaSchema.plugin(MongooseDelete, { overrideMethods: "all" });


const notaModel = model<Nota>('notas', NotaSchema);

export default notaModel;
