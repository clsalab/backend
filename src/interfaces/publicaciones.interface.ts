import { ObjectId } from "mongoose";

export interface Publicacion {
    title:string;
    description: string;
    username: ObjectId
}