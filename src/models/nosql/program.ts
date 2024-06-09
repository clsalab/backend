import mongoose, { Schema, model } from "mongoose";
import { Program } from "../../interfaces/programa.interface";
import MongooseDelete from "mongoose-delete";
import { ProgramSemester } from "../../interfaces/semestre.interface";
import { ProgramSubject } from "../../interfaces/asignatura.interface";

const ProgramSemesterSchema = new Schema<ProgramSemester>({
    codigoSemestre: { type: Number },
    semestre: { type: String, required: true },
    ano: { type: String, required: true },
    descripcionSemestre: { type: String }
});

const ProgramSubjectSchema = new Schema<ProgramSubject>({
    codigoAsignatura: { type: Number, required: true },
    tipoAsignatura: { type: String },
    descriptionAsignatura: { type: String, required: true },
    nombreAsignatura: { type: String, required: true }
});


const ProgramSchema = new Schema<Program>(
    {   
        codigoPrograma: { type: Number, required: true,  unique: true},
        nombrePrograma: { type: String, required: true },
        tipoPrograma:  { type: String, enum: ["Técnico", "Curso"], default: "Técnico" },
        intensidadHoraPrograma: { type: String, required: true },
        descripcionPrograma: { type: String, required: false },
        

    },
    {
        timestamps: true,
        versionKey: false
    }
);

ProgramSchema.plugin(MongooseDelete, { overrideMethods: "all" });

const programModel = model<Program>('Programas', ProgramSchema);

export default programModel;
