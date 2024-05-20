import { Router } from "express";
import { getItem, getItems, updateItem, deleteItem, postItem } from "../controllers/semester";
import { checkJwt } from "../middleware/sesion";
import { validatorCreateSemester, validatorGetSemester } from "../validators/semester";
import checkAdmin from "../middleware/rol";

const router = Router()
/* 
+ http://localhost:3002/item [Get]
 */

router.get('/', getItems);
router.get('/:id', getItem);
router.post('/', checkJwt, checkAdmin, validatorCreateSemester, postItem);



// Rutas para crear, actualizar y eliminar profesores solo accesibles para administradores
router.put('/:id', checkJwt, checkAdmin, validatorGetSemester, validatorCreateSemester, updateItem);
router.delete('/:id', checkJwt, checkAdmin,validatorGetSemester, deleteItem);


export default router;