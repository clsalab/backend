import { Router } from "express";
import { getItem, getItems, updateItem, deleteItem, registerCtrl } from "../controllers/teacher";
import { checkJwt } from "../middleware/sesion";
import checkAdmin from "../middleware/rol";
import { validatorCreateUser, validatorGetUser } from "../validators/user";

const router = Router()
/* 
+ http://localhost:3002/item [Get]
 */

router.get('/', getItems);
router.get('/:id', getItem);
router.post('/',checkJwt, checkAdmin, registerCtrl)


// Rutas para crear, actualizar y eliminar profesores solo accesibles para administradores
router.put('/:id', checkJwt, checkAdmin, validatorGetUser, validatorCreateUser, updateItem);
router.delete('/:id', checkJwt, checkAdmin, deleteItem);











export default router;