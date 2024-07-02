import { Router } from "express";
import { getItem, getItems, updateItem, deleteItem, getAdminUsers, getTeacherUsers, getStudentUsers, getUserUsers, userConFicha, getCountItems } from "../controllers/user";
import { checkJwt } from "../middleware/sesion";
import checkAdmin from "../middleware/rol";
import { validatorCreateUser, validatorGetUser } from "../validators/user";

const router = Router();

// Ruta para obtener todos los usuarios
router.get('/', getItems);
router.get('/count', getCountItems);
router.get('/:id', getItem);


// Ruta para actualizar un usuario por su ID
router.put('/:id', updateItem);

// Ruta para eliminar un usuario por su ID
router.delete('/:id', checkJwt, checkAdmin, deleteItem);

// Ruta para obtener usuarios con el rol "admin"
router.get('/roles/admin',  getAdminUsers);

// Ruta para obtener usuarios con el rol "teacher"
router.get('/roles/teacher',  getTeacherUsers);

// Ruta para obtener usuarios con el rol "student"
router.get('/roles/student',  getStudentUsers);

// Ruta para obtener usuarios con el rol "user"
router.get('/roles/user', getUserUsers);



export default router;
