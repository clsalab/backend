import { Campus } from "./campus";
import { ProgramSemester } from "./semester";
import { ProgramSubject } from "./subject";

export interface Program extends Campus{
    codigoPrograma?: number;
    nombrePrograma: string;
    tipoPrograma: string;
    intensidadHora?: string;
    descripcionPrograma?: string;
    semestre?:ProgramSemester[];
    asignaturas?:ProgramSubject[];
    
}