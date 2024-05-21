import { Program } from "./program";
import { User } from "./user.interface";

export interface Student extends User{
    estadoStudiante:("matriculado" | "egresado" | "desertado" | "cancelado")[];
    descripcionStudent?: string;
    programa?:Program[];
}
