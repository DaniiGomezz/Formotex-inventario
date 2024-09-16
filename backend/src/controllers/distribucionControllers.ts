import { Request, Response } from 'express';
import Distribucion from '../models/Distribucion';
import { IDistribucion } from '../interfaces/IDistribucion';

// Crear una nueva distribución
export const crearDistribucion = async (req: Request, res: Response) => {
  try {
    const distribucion: IDistribucion = new Distribucion(req.body);
    await distribucion.save();
    res.status(201).json(distribucion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todas las distribuciones
export const obtenerDistribuciones = async (req: Request, res: Response) => {
  try {
    const distribuciones = await Distribucion.find().populate('equipo_id');
    res.status(200).json(distribuciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener una distribución por ID
export const obtenerDistribucionPorId = async (req: Request, res: Response) => {
  try {
    const distribucion = await Distribucion.findById(req.params.id).populate('equipo_id');
    if (!distribucion) {
      return res.status(404).json({ message: 'Distribución no encontrada' });
    }
    res.status(200).json(distribucion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una distribución
export const actualizarDistribucion = async (req: Request, res: Response) => {
  try {
    const distribucion = await Distribucion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!distribucion) {
      return res.status(404).json({ message: 'Distribución no encontrada' });
    }
    res.status(200).json(distribucion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar una distribución
export const eliminarDistribucion = async (req: Request, res: Response) => {
  try {
    const distribucion = await Distribucion.findByIdAndDelete(req.params.id);
    if (!distribucion) {
      return res.status(404).json({ message: 'Distribución no encontrada' });
    }
    res.status(200).json({ message: 'Distribución eliminada con éxito' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};