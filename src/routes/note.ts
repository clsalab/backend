import { Router } from "express";
import { getItem, getItems, postItem, updateItem, deleteItem } from "../controllers/nota";
import { checkJwt } from "../middleware/sesion";
import checkTeacher from "../middleware/rolTeacher";
import { validatorCreateNota, validatorGetNota } from "../validators/nota";

const router = Router()
/* 
+ http://localhost:3002/item [Get]
 */

router.get('/', getItems);
router.get('/:id', getItem);


// Rutas para crear, actualizar y eliminar profesores solo accesibles para administradores
router.post('/', validatorCreateNota, postItem);
router.put('/:id', checkJwt, checkTeacher, validatorGetNota, validatorCreateNota, updateItem);
router.delete('/:id', checkJwt, checkTeacher, deleteItem);


export default router;