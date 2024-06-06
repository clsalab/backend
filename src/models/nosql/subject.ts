import { Schema, model } from "mongoose";
import { ProgramSubject } from "../../interfaces/asignatura.interface";
import MongooseDelete from "mongoose-delete";

const SubjectSchema = new Schema<ProgramSubject>(
{
    
    codigoAsignatura: { type: Number, required:true },
    tipoAsignatura: {type: String, required: true  },
    descriptionAsignatura: { type: String, required: true },
    nombreAsignatura: { type: String, required: true },
},
{
    timestamps: true,
    versionKey: false
}
);


SubjectSchema.plugin(MongooseDelete, { overrideMethods: "all" });

const subjectModel = model<ProgramSubject>('asignatura', SubjectSchema);

export default subjectModel;