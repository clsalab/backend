import { Auth } from "./auth.interface";

export interface User extends Auth{
    useremail: string;
    userpassword: string;
    username:string;
    userestado: string;
    userroles: ("user" | "admin")[];
}
