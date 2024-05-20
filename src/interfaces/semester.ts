import { Program } from "./program";

export interface Semester extends Program{
    codigoSemestre: Number;
    semestre: string;
    ano: string;
    descripcionSemestre?: string;
}