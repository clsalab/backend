import { Nota } from "./notas";

export interface Program {
    codigoPrograma?: number;
    nombrePrograma: string;
    tipoPrograma: string;
    intensidadHoraPrograma?: number;
    descripcionPrograma?: string;
    
}