import { Schema, Types, model } from "mongoose";
import { ProgramSemester } from "../../interfaces/semestre.interface";
import MongooseDelete from "mongoose-delete";

const SemesterSchema = new Schema<ProgramSemester>(
{
    codigoSemestre: { type: Number,  unique: true },
    semestre: {type: String, required: true  },
    ano: { type: String, required: true },
    descripcionSemestre: { type: String },
    asignaturas:[{ type:Types.ObjectId, ref: 'asignaturas', autopopulate: true }],
},
{
    timestamps: true,
    versionKey: false
}
);

SemesterSchema.plugin(require('mongoose-autopopulate'));
SemesterSchema.plugin(MongooseDelete, { overrideMethods: "all" });

const semesterModel = model<ProgramSemester>('semestres', SemesterSchema);

export default semesterModel;