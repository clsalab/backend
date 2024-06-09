import mongoose, { Schema, model } from "mongoose";
import MongooseDelete from "mongoose-delete";
import { Ficha } from "../../interfaces/ficha.interface";




const FichaSchema = new Schema<Ficha>(
    {     
        idFicha: { type: Number, required: true,  unique: true},
        semestre: [{ type:Schema.Types.ObjectId, ref: 'semestre', autopopulate: true }],
        estudiantes:[{ type:Schema.Types.ObjectId, ref: 'estudiantes', autopopulate: true }],
        sede: [{ type:Schema.Types.ObjectId, ref: 'sede', autopopulate: true }],
        profesores:[ { type:Schema.Types.ObjectId, ref: ' profesores', autopopulate: true }],
        programa:[ { type:Schema.Types.ObjectId, ref: 'programa', autopopulate: true }],
        asignaturas: [{ type:Schema.Types.ObjectId, ref: 'asignaturas', autopopulate: true }],
        descripcionFicha: [{ type: String, required: false }],
        

    },
    {
        timestamps: true,
        versionKey: false
    }
);

FichaSchema.plugin(require('mongoose-autopopulate'));
FichaSchema.plugin(MongooseDelete, { overrideMethods: "all" });

const fichaModel = model<Ficha>('Fichas', FichaSchema);

export default fichaModel;
