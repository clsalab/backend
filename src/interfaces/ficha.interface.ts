import { ObjectId } from "mongoose";
import { Program } from "./programa.interface";
import { Student } from "./student.interface";
import { Teacher } from "./teacher.interface";
import { Campus } from "./sede.interface";
import { ProgramSemester } from "./semestre.interface";

export interface Ficha  {
    idFicha: number;
    descripcionFicha: string;
    sede?: ObjectId | Campus[];
    semestre?: ObjectId | ProgramSemester[];
    estudiantes?: ObjectId | Student[];
    profesores?: ObjectId | Teacher[];
    programa?: ObjectId | Program [];
    asignaturas?: ObjectId | Program [];

}