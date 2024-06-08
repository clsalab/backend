import { Response } from "express";
import { matchedData } from "express-validator";
import usersModel from "../models/nosql/user";
import { handleHttp } from "../utils/error.handler";
import { RequestExt } from "../interfaces/req-ext.interface";
import { deleteUser, getUser, getUsersByRole, updateUser } from "../services/user.service";

// Obtener una lista de todos los usuarios
const getItems = async (req: RequestExt, res: Response) => {
    try {
        const user = req.user;
        const data = await usersModel.find({});
        res.send({ data, user });
    } catch (error) {
        handleHttp(res, "ERROR_GET_USERS");
    }
};

// Obtener un detalle de usuario por su ID
const getItem = async ({ params }: RequestExt, res: Response) => {
    try {
        const { id } = params;
        const response = await getUser(id);
        const data = response ? response : "NOT_FOUND";
        res.send(data);
    } catch (error) {
        handleHttp(res, 'ERROR_GET_USER');
    }
};

// Crear un nuevo usuario
const createItem = async (req: RequestExt, res: Response) => {
    try {
        const body = matchedData(req); // Limpiar la data
        const user = req.user;
        const data = new usersModel(body);
        await data.save();
        res.send({ data, user });
    } catch (error) {
        handleHttp(res, "ERROR_CREATE_USER");
    }
};

// Actualizar un usuario por su ID
const updateItem = async (req: RequestExt, res: Response) => {
    try {
        const { id } = req.params; // Obtener el ID del parámetro de la URL
        const { body } = req; // Obtener los datos de la solicitud

        // Acceder a req.user para obtener los datos del usuario que realiza la actualización
        const updatingUser = req.user;

        // Realizar la actualización y obtener los datos actualizados
        const response = await updateUser(id, body);

        if (!response) {
            return res.status(404).send("NOT_FOUND");
        }

        // Enviar los datos del usuario actualizado y del usuario que realizó la actualización
        res.send({ updatedUser: response, updatingUser });
    } catch (error) {
        handleHttp(res, 'ERROR_UPDATE_USER', error);
    }
};

// Eliminar un usuario por su ID
const deleteItem = async (req: RequestExt, res: Response) => {
    try {
        const { id } = req.params;
        const updatingUser = req.user;
        const response = await deleteUser(id);
        const data = response ? response : "NOT_FOUND";
        res.send({ deleteUser: data, updatingUser });
    } catch (error) {
        handleHttp(res, 'ERROR_DELETE_USER', error);
    }
};

// Obtener usuarios por rol "admin"
const getAdminUsers = async (req: RequestExt, res: Response) => {
    try {
        const users = await getUsersByRole("admin");
        res.json(users);
    } catch (error) {
        handleHttp(res, 'ERROR_GET_ADMIN_USERS', error);
    }
};

// Obtener usuarios por rol "teacher"
const getTeacherUsers = async (req: RequestExt, res: Response) => {
    try {
        const users = await getUsersByRole("teacher");
        res.json(users);
    } catch (error) {
        handleHttp(res, 'ERROR_GET_TEACHER_USERS', error);
    }
};

// Obtener usuarios por rol "student"
const getStudentUsers = async (req: RequestExt, res: Response) => {
    try {
        const users = await getUsersByRole("student");
        res.json(users);
    } catch (error) {
        handleHttp(res, 'ERROR_GET_STUDENT_USERS', error);
    }
};

// Obtener usuarios por rol "user"
const getUserUsers = async (req: RequestExt, res: Response) => {
    try {
        const users = await getUsersByRole("user");
        res.json(users);
    } catch (error) {
        handleHttp(res, 'ERROR_GET_USER_USERS', error);
    }
};

export { getItems, getItem, createItem, updateItem, deleteItem, getAdminUsers, getTeacherUsers, getStudentUsers, getUserUsers };
