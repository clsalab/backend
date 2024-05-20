import { Campus } from "./campus";
import { Program } from "./program";
import { Subject } from "./subject";

interface Ficha extends Campus, Program, Subject {
codigoStudent:string;
codigoTeacher: string;
codigoSede:string;
codigoPrograma:string;
codigoSubject: string;
}