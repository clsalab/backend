import mongoose, { Schema, model } from "mongoose";
import MongooseDelete from "mongoose-delete";
import { Publicacion } from "../../interfaces/publicaciones.interface";


const PublicacionesSchema = new Schema<Publicacion>(

    {
        title:{
            type:String
        },
        description:{
            type:String
        },
        username:{
            type:mongoose.Types.ObjectId
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

PublicacionesSchema.plugin(MongooseDelete, { overrideMethods: "all" });

const publicacionesModel = model<Publicacion>('publicaciones', PublicacionesSchema);

export default publicacionesModel;