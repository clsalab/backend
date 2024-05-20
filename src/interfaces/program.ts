import { Campus } from "./campus";

export interface Program extends Campus{
    codigoPrograma: number;
    nombrePrograma: string;
    tipoPrograma: string;
    intensidadHora?: string;
    descripcionPrograma?: string[];
}