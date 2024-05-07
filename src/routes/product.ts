// ./routes/product.ts
import { Router } from "express";
import { getItems, getItem, postItem, updateItem, deleteItem } from "../controllers/product";
import { checkJwt } from "../middleware/sesion";
import checkAdmin from "../middleware/rol";

const router = Router();

//TODO http://localhost:3002/storage
router.get('/', checkJwt, checkAdmin, getItems);

router.get('/:id', getItem);


router.post('/', postItem);


router.put('/:id', updateItem);


router.delete('/:id',checkJwt, deleteItem);



export default router;