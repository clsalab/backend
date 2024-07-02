import mongoose, { Schema, Types, model } from "mongoose";
import MongooseDelete from "mongoose-delete";
import { Ficha } from "../../interfaces/ficha.interface";




const FichaSchema = new Schema<Ficha>(
    {     
        idFicha: { type: Number, required: true,  unique: true},        
        descripcionFicha: { type: String, required: false },
        sede: [{ type:Types.ObjectId,  ref: 'sedes', autopopulate: true}],
        programa: [{ type:Types.ObjectId, ref: 'programas', autopopulate: true }],
        semestre1: [{ type:Types.ObjectId, ref: 'semestres', autopopulate: true }],
        semestre2:[{ type:Types.ObjectId, ref: 'semestres', autopopulate: true }],
        semestre3:[{ type:Types.ObjectId, ref: 'semestres', autopopulate: true }],
        

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