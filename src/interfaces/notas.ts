import { ProgramSubject } from "./asignatura.interface";

export interface Nota extends ProgramSubject {
    nombreAsignatura: string;
    nota1?: string;
    nota2?: string;
    nota3?: string;
    notaD?: string;
    descripcion?: string;
    profesor?: string;
}