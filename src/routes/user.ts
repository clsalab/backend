import { Router } from "express";
import { getItem, getItems, updateItem, deleteItem } from "../controllers/user";
import { checkJwt } from "../middleware/sesion";
import checkAdmin from "../middleware/rol";
import { validatorCreateUser, validatorGetUser } from "../validators/user";

const router = Router()
/* 
+ http://localhost:3002/item [Get]
 */

router.get('/', getItems);
router.get('/:id', getItem);



// Rutas para crear, actualizar y eliminar profesores solo accesibles para administradores
router.put('/:id', checkJwt, checkAdmin, validatorGetUser, validatorCreateUser, updateItem);
router.delete('/:id', checkJwt, checkAdmin, deleteItem);











export default router;