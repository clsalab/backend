import { Router } from "express";
import { getItem, getItems, postItem, updateItem, deleteItem } from "../controllers/ficha";
import { checkJwt } from "../middleware/sesion";

const router = Router()
/* 
+ http://localhost:3002/item [Get]
 */

router.get('/', getItems);
router.get('/:id', getItem);


// Rutas para crear, actualizar y eliminar profesores solo accesibles para administradores
router.post('/', postItem);
router.put('/:id', checkJwt, updateItem);
router.delete('/:id', checkJwt, deleteItem);


export default router;