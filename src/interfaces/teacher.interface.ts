import { ProgramSubject } from "./subject";
import { User } from "./user.interface";

export interface Teacher extends User{
    cargo: string;
    tituloAcademico: string;
    descripcionTeacher?: string;
    anoExperiencia?:string;
    asignaturas?:ProgramSubject[];
    
}
