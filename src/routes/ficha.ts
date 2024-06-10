// routes.ts

import { Router } from 'express';
import FichaController from '../controllers/ficha';

const router = Router();

// Rutas para la gestión de fichas de matrícula
router.post('/', FichaController.crearFicha); // Crear una nueva ficha de matrícula
router.get('/', FichaController.obtenerTodasLasFichas); // Obtener todas las fichas de matrícula
router.get('/:id', FichaController.obtenerFichaPorId); // Obtener una ficha de matrícula por su ID
router.put('/:id', FichaController.actualizarFicha); // Actualizar una ficha de matrícula
router.delete('/:id', FichaController.eliminarFicha); // Eliminar una ficha de matrícula
router.get('/sede/:idSede', FichaController.obtenerFichasPorIdSede);
export default router;
