import { Schema, model, } from "mongoose";
import { User } from "../../interfaces/user.interface";
const mongooseDelete = require("mongoose-delete");


const UserSchema = new Schema<User>(
    {
        username: { type: String, required: true },
        useremail: { type: String, required: true, unique: true },
        userpassword: { type: String, required: true, select: false },
        userestado: { type: String, enum: ["activo", "inactivo"], default: "activo" },
        userroles: { type: [{ type: String, enum: ["user", "admin"] }], default: ["user"] },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

UserSchema.plugin(mongooseDelete, { overrideMethods: "all" });

const UserModel = model<User>('users', UserSchema);

export default UserModel;
