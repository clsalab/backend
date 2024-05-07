import {  Router } from "express";
import { getVendedor, getVendedors, postVendedor, updateVendedor, deleteVendedor } from "../controllers/vendedor";

const router = Router()
/* 
+ http://localhost:3002/Vendedor [Get]
 */
router.get('/:id', getVendedor);
router.get('/', getVendedors);
router.post('/', postVendedor);
router.put('/:id', updateVendedor);
router.delete('/:id', deleteVendedor);




export default router;