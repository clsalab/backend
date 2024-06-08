import { User } from "../interfaces/user.interface";
import UserModel from "../models/nosql/user"; // Supongamos que tienes un modelo de usuario definido con Mongoose

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

// Función para obtener usuarios por rol
async function getUsersByRole(role: string): Promise<User[] | null> {
    try {
        // Buscar usuarios en la base de datos por el rol especificado
        const users = await UserModel.find({ userroles: role });
        // Devolver los usuarios encontrados
        return users;
    } catch (error) {
        console.error("Error al obtener los usuarios por rol:", error);
        // Si ocurre un error, devolver null
        return null;
    }
}

// Función para obtener todos los usuarios
const getUsers = async (): Promise<User[] | null> => {
    try {
        const users = await UserModel.find({});
        return users;
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        return null;
    }
};

// Función para obtener un usuario por su ID
const getUser = async (id: string): Promise<User | null> => {
    try {
        const user = await UserModel.findOne({ _id: id });
        return user;
    } catch (error) {
        console.error("Error al obtener el usuario por ID:", error);
        return null;
    }
};

// Función para actualizar un usuario por su ID
const updateUser = async (id: string, data: User): Promise<User | null> => {
    try {
        const updatedUser = await UserModel.findOneAndUpdate({ _id: id }, data, { new: true });
        return updatedUser;
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        return null;
    }
};

// Función para eliminar un usuario por su ID
const deleteUser = async (id: string): Promise<boolean> => {
    try {
        const result = await UserModel.deleteOne({ _id: id });
        return result.deletedCount === 1;
    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        return false;
    }
};

export { getUserRolesByEmail, getUsersByRole, getUsers, getUser, updateUser, deleteUser };
