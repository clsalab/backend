// services/user.service.ts
import { User } from "../interfaces/user.interface";
import  UserModel  from "../models/nosql/user"; // Supongamos que tienes un modelo de usuario definido con Mongoose

// Función para obtener los roles del usuario por correo electrónico
async function getUserRolesByEmail(email: string): Promise<string[] | null> {
    try {
        // Buscar el usuario en la base de datos por su correo electrónico
        const user = await UserModel.findOne({ useremail: email });
        if (user) {
            // Si se encuentra el usuario, devolver sus roles
            return user.userroles;
        } else {
            // Si no se encuentra el usuario, devolver null
            return null;
        }
    } catch (error) {
        console.error("Error al obtener los roles del usuario:", error);
        // Si ocurre un error, devolver null
        return null;
    }
    
}

const getUsers = async () => {
    const responseItem = await UserModel.find({});
    return responseItem;
};


const getUser = async (id:string) => {
    const responseItem = await UserModel.findOne({ _id: id });
    return responseItem;
};

const updateUser = async (id: string, data: User ) => {
    const responseItem = await UserModel.findOneAndUpdate({ _id:id}, data, {
        new:true,
    });
    return responseItem;
}
const deleteUser = async (id:string)=> {
    const responseItem = await UserModel.deleteOne({ _id: id });
    return responseItem;


}


export { getUserRolesByEmail, getUsers, getUser, updateUser,  deleteUser };
