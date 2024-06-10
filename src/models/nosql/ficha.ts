import mongoose, { Schema, Types, model } from "mongoose";
import MongooseDelete from "mongoose-delete";
import { Ficha } from "../../interfaces/ficha.interface";




const FichaSchema = new Schema<Ficha>(
    {     
        idFicha: { type: Number, required: true,  unique: true},
        semestre: [{ type:Types.ObjectId, ref: 'semestres', autopopulate: true }],
        estudiantes:[{ type:Types.ObjectId, ref: 'users', autopopulate: true }],
        sede: [{ type:Types.ObjectId, ref: 'sedes', autopopulate: true }],
        profesores:[ { type:Types.ObjectId, ref: 'users', autopopulate: true }],
        programa:[ { type:Types.ObjectId, ref: 'programas', autopopulate: true }],
        asignaturas: [{ type:Types.ObjectId, ref: 'asignaturas', autopopulate: true }],
        descripcionFicha: [{ type: String, required: false }],
        

    },
    {
        timestamps: true,
        versionKey: false
    }
);

FichaSchema.plugin(require('mongoose-autopopulate'));
FichaSchema.plugin(MongooseDelete, { overrideMethods: "all" });

const fichaModel = model<Ficha>('fichas', FichaSchema);

export default fichaModel;