import { Campus } from "./sede.interface";
import { ProgramSemester } from "./semestre.interface";
import { ProgramSubject } from "./asignatura.interface";
import { Types } from "mongoose";

export interface Program {
    codigoPrograma?: number;
    nombrePrograma: string;
    tipoPrograma: string;
    intensidadHoraPrograma?: number;
    descripcionPrograma?: string;
    
}