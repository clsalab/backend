import { Schema, model } from "mongoose";
import { ProgramSemester } from "../../interfaces/semestre.interface";
import MongooseDelete from "mongoose-delete";

const SemesterSchema = new Schema<ProgramSemester>(
{
    codigoSemestre: { type: Number,  unique: true },
    semestre: {type: String, required: true  },
    ano: { type: String, required: true },
    descripcionSemestre: { type: String },
},
{
    timestamps: true,
    versionKey: false
}
);


SemesterSchema.plugin(MongooseDelete, { overrideMethods: "all" });

const semesterModel = model<ProgramSemester>('semestre', SemesterSchema);

export default semesterModel;