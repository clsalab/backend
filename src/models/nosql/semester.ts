import { Schema, model } from "mongoose";
import { Semester } from "../../interfaces/semester";
import MongooseDelete from "mongoose-delete";

const SemesterSchema = new Schema<Semester>(
{
    codigoSemestre: { type: Number, required:true },
    semestre: {type: String, required: true  },
    ano: { type: String, required: true },
    descripcionSemestre: { type: String, required: true },
},
{
    timestamps: true,
    versionKey: false
}
);


SemesterSchema.plugin(MongooseDelete, { overrideMethods: "all" });

const semesterModel = model<Semester>('semestre', SemesterSchema);

export default semesterModel;