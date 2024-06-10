// interfaces/ficha.interface.ts

import { Document, Types } from "mongoose";

export interface Ficha extends Document {
    idFicha: number;
    descripcionFicha: string;
    sede: Types.ObjectId[];
    semestre: Types.ObjectId[];
    estudiantes: Types.ObjectId[];
    profesores: Types.ObjectId[];
    programa: Types.ObjectId[];
    asignaturas: Types.ObjectId[];
}

