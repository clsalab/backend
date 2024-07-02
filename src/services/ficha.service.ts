// ficha.service.ts

import mongoose from 'mongoose';
import fichaModel from '../models/nosql/ficha';

class FichaService {
  // Método para crear una nueva ficha de matrícula
    async crearFicha(data: any) {
        try {
        // Crear la nueva ficha en la base de datos
        const nuevaFicha = await fichaModel.create(data);
        return nuevaFicha;
        } catch (error) {
        throw new Error('Error al crear la ficha de matrícula');
        }
    }

    // Método para obtener todas las fichas de matrícula
    async obtenerTodasLasFichas() {
        try {
        // Obtener todas las fichas de matrícula de la base de datos
        const fichas = await fichaModel.find();
        return fichas;
        } catch (error) {
        throw new Error('Error al obtener las fichas de matrícula');
        }
    }

       // Método para CONTAR todas las fichas de matrícula
    async contarTodasLasFichas() {
        try {
        // contar todas las fichas de matrícula de la base de datos
        const fichas = await fichaModel.find().countDocuments();
        return fichas;
        } catch (error) {
        throw new Error('Error al contar las fichas de matrícula');
        }
    }

    // Método para obtener una ficha de matrícula por su ID
    async obtenerFichaPorId(id: string) {
        try {
        // Buscar la ficha de matrícula por su ID en la base de datos
        const ficha = await fichaModel.findById(id);
        return ficha;
        } catch (error) {
        throw new Error('Error al obtener la ficha de matrícula');
        }
    }

    // Método para actualizar una ficha de matrícula
    async actualizarFicha(id: string, data: any) {
        try {
        // Actualizar la ficha de matrícula en la base de datos
        const fichaActualizada = await fichaModel.findByIdAndUpdate(id, data, { new: true });
        return fichaActualizada;
        } catch (error) {
        throw new Error('Error al actualizar la ficha de matrícula');
        }
    }

    // Método para eliminar una ficha de matrícula
    async eliminarFicha(id: string) {
        try {
        // Eliminar la ficha de matrícula de la base de datos
        await fichaModel.findByIdAndDelete(id);
        return { mensaje: 'Ficha de matrícula eliminada exitosamente' };
        } catch (error) {
        throw new Error('Error al eliminar la ficha de matrícula');
        }
    } 
}





export default new FichaService();
