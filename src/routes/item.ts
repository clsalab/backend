import { Router } from "express";
import { getItem, getItems, postItem, updateItem, deleteItem } from "../controllers/item";
import { checkJwt } from "../middleware/sesion";
import checkAdmin from "../middleware/rol";
import { validatorCreateItem, validatorGetItem } from "../validators/items";

const router = Router()
/* 
+ http://localhost:3002/item [Get]
 */

router.get('/', getItems);
router.get('/:id', getItem);
router.post('/',checkJwt,checkAdmin, validatorCreateItem, postItem);
router.put('/:id',checkJwt,checkAdmin, validatorGetItem, updateItem);
router.delete('/:id', deleteItem);






export default router;