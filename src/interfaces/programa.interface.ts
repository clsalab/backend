import { Campus } from "./sede.interface";
import { ProgramSemester } from "./semestre.interface";
import { ProgramSubject } from "./asignatura.interface";

export interface Program extends Campus{
    codigoPrograma?: number;
    nombrePrograma: string;
    tipoPrograma: string;
    intensidadHora?: string;
    descripcionPrograma?: string;
    semestre?:ProgramSemester[];
    asignaturas?:ProgramSubject[];
    
}