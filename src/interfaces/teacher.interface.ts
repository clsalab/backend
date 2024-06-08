import { Types } from "mongoose";
import { ProgramSubject } from "./asignatura.interface";
import { Auth } from "./auth.interface";

export interface Teacher extends Auth{
    useremail: string;
    userpassword: string;
    username:string;
    userestado: string;
    userroles: ("user" | "student" | "teacher" | "admin")[];
    tipoDocumento: string;
    fechaNacimiento: Date;
    numeroDocumento: number;
    documentoIdentidad: File; // Aquí podrías definir el tipo adecuado para cargar archivos
    paisExpedicion: string;
    departamentoExpedicion: string;
    municipioExpedicion: string;
    fechaExpedicion: Date;
    nombres: string;
    apellidos: string;
    sexo: string;
    direccion: string;
    celular: string;
    paisNacimiento: string;
    departamentoNacimiento: string;
    municipioNacimiento: string;
    estrato: number;
    cargo: string;
    tituloAcademico: string;
    perfilLaboral?: string;
    anoExperiencia?:string;
    asignaturas?: Types.ObjectId[] | ProgramSubject;
    
}
