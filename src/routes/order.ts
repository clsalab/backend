import { Router } from "express";
import { checkJwt } from "../middleware/sesion";
import { getOrder } from "../controllers/order";


const router = Router();

router.get("/", checkJwt, getOrder);


export default  router ;