import { Program } from "./program";
import { Student } from "./student.interface";
import { Teacher } from "./teacher.interface";

interface Ficha extends Program {
    idFicha: number;
    estudiante: Student[];
    profesor: Teacher[];
    

}