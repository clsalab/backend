/* import { model } from "mongoose";
import { Teacher } from "../../interfaces/teacher.interface";
import MongooseDelete from "mongoose-delete";

const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
    useremail: { type: String, required: true, unique: true},
    userpassword: { type: String, required: true },
    username: { type: String, required: true },
    userestado: { type: String, enum: ['active', 'inactive'], default: 'active' },
    userroles: { type: [{ type: String, enum: ["user", "student", "teacher", "admin"] }], default: ["teacher"] },
    tipoDocumento: { type: mongoose.Schema.Types.String, required: true },
    fechaNacimiento: { type: Date,required: true },
    numeroDocumento: { type: Number,required: true, unique: true},
    documentoIdentidad: { type: String, required: true }, // Puedes almacenar la ruta del archivo o el contenido codificado en base64
    paisExpedicion: { type: String,required: true },
    departamentoExpedicion: { type: String,required: true },
    municipioExpedicion: { type: String,required: true },
    fechaExpedicion: { type: Date,required: true },
    nombres: { type: String,required: true },
    apellidos: { type: String,required: true },
    sexo: { type: String, enum: ['masculino', 'femenino'],required: true },
    direccion: { type: String,required: true },
    celular: { type: String,required: true },
    paisNacimiento: { type: String,required: true },
    departamentoNacimiento: { type: String,required: true },
    municipioNacimiento: { type: String,required: true },
    estrato: { type: Number,required: true },
    cargo: { type: String,required: true },
    tituloAcademico: { type: String,required: true },
    perfilLaboral: { type: String,required: true },
    anoExperiencia: { type: String,required: true },
    asignaturas: [{
        codigoAsignatura: { type: Number },
        nombreAsignatura: { type: String },
        tipoAsignatura: { type: String },
        intensidadHora: { type: String },
        descriptionAsignatura: { type: String }
    }]
},
{
    versionKey: false,
    timestamps: true,
});


TeacherSchema.plugin(MongooseDelete, { deleted: true });

const teacherModel = model<Teacher>('teacher', TeacherSchema);

export default teacherModel;
 */

import mongoose, { Schema, model, } from "mongoose";
import { Teacher } from "../../interfaces/teacher.interface";
const mongooseDelete = require("mongoose-delete");


const TeacherSchema = new Schema<Teacher>(
    {
        username: { type: String, required: true },
        useremail: { type: String, required: true, unique: true },
        userpassword: { type: String, required: true, select: false },
        userestado: { type: String, enum: ["activo", "inactivo"], default: "activo" },
        userroles: { type: [{ type: String, enum: ["user", "student", "teacher", "admin"] }], default: ["teacher"] },
        tipoDocumento: { type: String, required: true },
        fechaNacimiento: { type: Date, required: true },
        numeroDocumento: { type: Number, required: true, unique: true },
        documentoIdentidad: { type: String }, // Cambiar por el tipo de dato correcto para guardar archivos en la base de datos
        paisExpedicion: { type: String, required: true },
        departamentoExpedicion: { type: String, required: true },
        municipioExpedicion: { type: String, required: true },
        fechaExpedicion: { type: Date, required: true },
        nombres: { type: String, required: true },
        apellidos: { type: String, required: true },
        sexo: { type: String, required: true },
        direccion: { type: String, required: true },
        celular: { type: String, required: true },
        paisNacimiento: { type: String, required: true },
        departamentoNacimiento: { type: String, required: true },
        municipioNacimiento: { type: String, required: true },
        estrato: { type: Number, required: true },
        cargo: { type: String,required: true },
        tituloAcademico: { type: String,required: true },
        perfilLaboral: { type: String,required: true },
        anoExperiencia: { type: String,required: true },
    },
    {
        versionKey: false,
        timestamps: true,
    });

TeacherSchema.plugin(mongooseDelete, { deleted: true });

const teachersModel = model<Teacher>('Teachers', TeacherSchema);

export default teachersModel;
