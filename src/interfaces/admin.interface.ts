import { User } from "./user.interface";

export interface Admin extends User{
    userroles: ("admin" | "user")[];
    tituloAcademico: string;
    perfilLaboral: string;
    Cargo: string;
    añosExperiencia: Number;

}
