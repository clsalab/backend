import { Router } from "express";
import { getItem, getItems, updateItem, deleteItem } from "../controllers/user";
import { checkJwt } from "../middleware/sesion";
import { validatorCreateUser, validatorGetUser } from "../validators/user";
import checkTeacher from "../middleware/rolTeacher";

const router = Router()
/* 
+ http://localhost:3002/item [Get]
 */

router.get('/', getItems);
router.get('/:id', getItem);


// Rutas para crear, actualizar y eliminar profesores solo accesibles para administradores
router.put('/:id', checkJwt, checkTeacher, validatorGetUser, validatorCreateUser, updateItem);
router.delete('/:id', checkJwt, checkTeacher, deleteItem);


export default router;