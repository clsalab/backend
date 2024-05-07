import { Router } from "express";
import { checkJwt } from "../middleware/sesion";
import { getFile } from "../controllers/upload";
import  multerMiddleware  from "../middleware/file"


const router = Router();

router.post("/",checkJwt, multerMiddleware.single('myfile'), getFile )

export default  router ;