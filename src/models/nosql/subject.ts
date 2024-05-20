import { Schema, model } from "mongoose";
import { Subject } from "../../interfaces/subject";
import MongooseDelete from "mongoose-delete";

const SubjectSchema = new Schema<Subject>(
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

const subjectModel = model<Subject>('asignatura', SubjectSchema);

export default subjectModel;