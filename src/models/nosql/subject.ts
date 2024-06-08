import { Schema, model } from "mongoose";
import { ProgramSubject } from "../../interfaces/asignatura.interface";
import MongooseDelete from "mongoose-delete";

const SubjectSchema = new Schema<ProgramSubject>(
{
    
    codigoAsignatura: { type: Number,  unique: true },
    tipoAsignatura: {type: String  },
    descriptionAsignatura: { type: String },
    nombreAsignatura: { type: String, required: true },
    intensidadHoraAsignatura: { type: String },
},
{
    timestamps: true,
    versionKey: false
}
);


SubjectSchema.plugin(MongooseDelete, { overrideMethods: "all" });

const subjectModel = model<ProgramSubject>('asignatura', SubjectSchema);

export default subjectModel;