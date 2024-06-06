import { Schema, model } from "mongoose";
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
        codigoSede: { type: Number, required:true },
        nombreSede: { type: String, required: true },
        descriptionSede: { type: String, required: true },
        municipio: { type: String, required: true },
        departamento: { type: String, required: true },
        codigoPrograma: { type: Number, required: true },
        nombrePrograma: { type: String, required: true },
        tipoPrograma:  { type: String, enum: ["Técnico", "Curso"], default: "Técnico" },
        intensidadHora: { type: String, required: true },
        descripcionPrograma: { type: String, required: false }, // Corregido el error tipográfico
        semestre: { type: [ProgramSemesterSchema] },
        asignaturas: { type: [ProgramSubjectSchema] }
        

    },
    {
        timestamps: true,
        versionKey: false
    }
);

ProgramSchema.plugin(MongooseDelete, { overrideMethods: "all" });

const programModel = model<Program>('Programa', ProgramSchema);

export default programModel;
