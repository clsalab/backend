import { ProgramSubject } from "./asignatura.interface";
import { User } from "./user.interface";

export interface Teacher extends User{
    userroles: ("teacher" | "user")[];
    cargo: string;
    tituloAcademico: string;
    perfilLaboral?: string;
    anoExperiencia?:string;
    asignaturas?:ProgramSubject[];
    
}
