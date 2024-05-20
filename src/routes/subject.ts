import { Router } from "express";
import { getItem, getItems, updateItem, deleteItem, postItem } from "../controllers/subject";
import { checkJwt } from "../middleware/sesion";
import { validatorCreateSubject, validatorGetSubject } from "../validators/subject";
import checkAdmin from "../middleware/rol";

const router = Router()
/* 
+ http://localhost:3002/item [Get]
 */

router.get('/', getItems);
router.get('/:id', getItem);
router.post('/', validatorCreateSubject, postItem);



// Rutas para crear, actualizar y eliminar profesores solo accesibles para administradores
router.put('/:id', checkJwt, checkAdmin, validatorGetSubject, validatorCreateSubject, updateItem);
router.delete('/:id', checkJwt, checkAdmin,validatorGetSubject, deleteItem);


export default router;