import { Router } from "express";
import { checkJwt } from "../middleware/sesion";
import checkAdmin from "../middleware/rol";
import { getTeacherUsers } from "../controllers/user";

const router = Router()
/* 
+ http://localhost:3002/item [Get]
 */
router.get('/roles/teacher',checkJwt, checkAdmin, getTeacherUsers);





export default router;