import { User } from "./user.interface";

export interface Teacher extends User{
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
    paisNacimiento: string;
    departamentoNacimiento: string;
    municipioNacimiento: string;
    estrato: number;
    
}
