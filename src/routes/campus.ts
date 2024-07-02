import { Router } from "express";
import { getItemCampus, getItemsCampus, postItemCampus, updateItemCampus, deleteItemCampus, getCountCampus } from "../controllers/campus";
import { checkJwt } from "../middleware/sesion";
import { validatorCreateCampus, validatorGetCampus } from "../validators/campus";
import checkTeacher from "../middleware/rolTeacher";

const router = Router()
/* 
+ http://localhost:3002/item [Get]
 */

router.get('/', getItemsCampus);
router.get('/count', getCountCampus);
router.get('/:id', getItemCampus);


// Rutas para crear, actualizar y eliminar profesores solo accesibles para administradores
router.post('/',validatorCreateCampus, postItemCampus);
router.put('/:id', checkJwt, checkTeacher, validatorGetCampus, validatorCreateCampus, updateItemCampus);
router.delete('/:id', checkJwt, checkTeacher, deleteItemCampus);


export default router;