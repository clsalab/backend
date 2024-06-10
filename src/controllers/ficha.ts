// ficha.controller.ts

import { Request, Response } from 'express';
import FichaService from '../services/ficha.service';
import fichaModel from '../models/nosql/ficha';

class FichaController {
  // Controlador para crear una nueva ficha de matrícula
    async crearFicha(req: Request, res: Response) {
        try {
        const nuevaFicha = await FichaService.crearFicha(req.body);
        res.status(201).json(nuevaFicha);
        } catch (error: any) { // Especificar el tipo de error como 'any'
        res.status(500).json({ mensaje: error.message });
        }
    }

    // Controlador para obtener todas las fichas de matrícula
    async obtenerTodasLasFichas(req: Request, res: Response) {
        try {
        const fichas = await FichaService.obtenerTodasLasFichas();
        res.status(200).json(fichas);
        } catch (error: any) { // Especificar el tipo de error como 'any'
        res.status(500).json({ mensaje: error.message });
        }
    }

    // Controlador para obtener una ficha de matrícula por su ID
    async obtenerFichaPorId(req: Request, res: Response) {
        try {
        const ficha = await FichaService.obtenerFichaPorId(req.params.id);
        if (!ficha) {
            return res.status(404).json({ mensaje: 'Ficha de matrícula no encontrada' });
        }
        res.status(200).json(ficha);
        } catch (error: any) { // Especificar el tipo de error como 'any'
        res.status(500).json({ mensaje: error.message });
        }
    }

    // Controlador para actualizar una ficha de matrícula
    async actualizarFicha(req: Request, res: Response) {
        try {
        const fichaActualizada = await FichaService.actualizarFicha(req.params.id, req.body);
        res.status(200).json(fichaActualizada);
        } catch (error: any) { // Especificar el tipo de error como 'any'
        res.status(500).json({ mensaje: error.message });
        }
    }

    // Controlador para eliminar una ficha de matrícula
    async eliminarFicha(req: Request, res: Response) {
        try {
        await FichaService.eliminarFicha(req.params.id);
        res.status(200).json({ mensaje: 'Ficha de matrícula eliminada exitosamente' });
        } catch (error: any) { // Especificar el tipo de error como 'any'
        res.status(500).json({ mensaje: error.message });
        }
    }

    // Controlador para obtener fichas de matrícula por nombre de sede
    async obtenerFichasPorNombreSede(nombreSede: string) {
        try {
          // Buscar las fichas que tengan la sede con el nombre especificado usando agregación
        const fichas = await fichaModel.aggregate([
        {
            $lookup: {
            from: 'sedes', // Nombre de la colección con la que se quiere hacer el join
            localField: 'sede._id', // Campo local
            foreignField: '_id', // Campo en la colección externa
            as: 'sedeDetalle' // Nombre del array que contendrá los documentos unidos
            }
        },
        {
            $unwind: '$sedeDetalle' // Descomponer el array para acceder a los campos del documento
        },
        {
            $match: { 'sedeDetalle.nombreSede': nombreSede } // Filtro por nombreSede
        }
        ]);
        return fichas;
    } catch (error) {
        throw new Error('Error al obtener las fichas de matrícula por nombre de la sede');
    }
    }

    async obtenerFichasPorIdSede(req: Request, res: Response) {
        try {
        const { idSede } = req.params;
        const fichas = await FichaService.obtenerFichasPorIdSede(idSede);
        res.status(200).json(fichas);
    } catch (error: any) {
        res.status(500).json({ mensaje: error.message });
    }
    }

}

export default new FichaController();
