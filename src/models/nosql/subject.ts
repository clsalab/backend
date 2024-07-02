import { Schema, Types, model } from "mongoose";
import { ProgramSubject } from "../../interfaces/asignatura.interface";
import MongooseDelete from "mongoose-delete";

const SubjectSchema = new Schema<ProgramSubject>(
{
    
    codigoAsignatura: { type: Number,  unique: true },
    nombreAsignatura: { type: String, required: true },
    tipoAsignatura: {type: String  },
    descriptionAsignatura: { type: String },
    intensidadHoraAsignatura: { type: String },
    notaA:{ type: String },
    nota1:{ type: String },
    nota2:{ type: String },
    nota3:{ type: String },
    notaD:{ type: String },
    definicion:{ type: String },
    profesor:[ { type:Types.ObjectId, ref: 'users', autopopulate: true }],

},
{
    timestamps: true,
    versionKey: false
}
);

SubjectSchema.plugin(require('mongoose-autopopulate'));
SubjectSchema.plugin(MongooseDelete, { overrideMethods: "all" });

const subjectModel = model<ProgramSubject>('asignaturas', SubjectSchema);

export default subjectModel;