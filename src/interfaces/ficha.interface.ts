// interfaces/ficha.interface.ts

import { Document, Types } from "mongoose";

export interface Ficha extends Document {
    idFicha: number;
    descripcionFicha: string;
    sede: string[];
    programa: string[];
    semestre1: string[];
    semestre2: string[];
    semestre3: string[];
}

