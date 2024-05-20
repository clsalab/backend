import { Program } from "./program";

export interface Subject extends Program{
    codigoAsignatura: Number;
    nombreAsignatura: string;
    tipoAsignatura?: string[];
    intensidadHora?: string;
    descriptionAsignatura?: string[];
    docente?: string[];
    gruposAsignatura?: string[];
}