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

    // Método para obtener fichas de matrícula por nombre de sede
    async obtenerFichasPorNombreSede(nombreSede: string) {
    try {
        // Buscar las fichas que tengan la sede con el nombre especificado
        const fichas = await fichaModel.find({ 'sede.nombreSede': nombreSede });
        return fichas;
    } catch (error) {
        throw new Error('Error al obtener las fichas de matrícula por nombre de la sede');
    }
    }

    async obtenerFichasPorIdSede(idSede: string) {
        try {
        const fichas = await fichaModel.aggregate([
        {
            $lookup: {
            from: 'sedes',
            localField: 'sede',
            foreignField: '_id',
            as: 'sedeDetalle'
            }
        },
        {
            $unwind: '$sedeDetalle'
        },
        {
            $match: { 'sedeDetalle._id': new mongoose.Types.ObjectId(idSede) }
        },
        {
            $lookup: {
            from: 'semestres',
            localField: 'semestre',
            foreignField: '_id',
            as: 'semestreDetalle'
            }
        },
        { $unwind: '$semestreDetalle'},
        {
            $lookup: {
            from: 'users',
            let: { profesoresIds: '$profesores' },
            pipeline: [
                {
                $match: {
                    $expr: {
                    $and: [
                        { $in: ['$_id', '$$profesoresIds'] },
                        { $in: ['teacher', '$userroles'] } // Verifica si 'teacher' está presente en el array 'userroles'
                    ]
                    }
                }
                }
            ],
            as: 'profesoresDetalle'
            }
        },
        { $unwind: '$profesoresDetalle'},
        {
            $lookup: {
            from: 'users',
            let: { estudiantesIds: '$estudiantes' },
            pipeline: [
                {
                $match: {
                    $expr: {
                    $and: [
                        { $in: ['$_id', '$$estudiantesIds'] },
                        { $in: ['student', '$userroles'] } // Verifica si 'student' está presente en el array 'userroles'
                    ]
                    }
                }
                }
            ],
            as: 'estudiantesDetalle'
            }
        },
        { $unwind: '$estudiantesDetalle'},
        {
            $lookup: {
            from: 'programas',
            localField: 'programa',
            foreignField: '_id',
            as: 'programaDetalle'
            }
        },
        { $unwind: '$programaDetalle'},
        {
            $lookup: {
            from: 'asignaturas',
            localField: 'asignaturas',
            foreignField: '_id',
            as: 'asignaturasDetalle'
            }
        },
        { $unwind: '$asignaturasDetalle'}
        ]);
        return fichas;
    } catch (error) {
        throw new Error('Error al obtener las fichas de matrícula por ID de la sede');
    }
    }
    
}



export default new FichaService();
