import { ProgramSubject } from "./asignatura.interface";
import { Auth } from "./auth.interface";
import { Program } from "./programa.interface";
import { Campus } from "./sede.interface";
import { ProgramSemester } from "./semestre.interface";

export interface User extends Auth{
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
    cargo?: string;
    tituloAcademico?: string;
    perfilLaboral?: string;
    anoExperiencia?:string;
    programaF?: Program[];
    asignaturas?:ProgramSubject[];
    semestre?:ProgramSemester[];
    sede?: Campus[];
    profesores?: string[];
    estadoStudiante?:("matriculado" | "egresado" | "desertado" | "cancelado")[];
    descripcionStudent?: string;
    ficha?:Program[];
}
