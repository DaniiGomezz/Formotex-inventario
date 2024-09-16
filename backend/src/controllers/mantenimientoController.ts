import { Request, Response } from 'express';
import Mantenimiento from '../models/Mantenimiento';
import { IMantenimiento } from '../interfaces/IMantenimiento';

// Crear un nuevo mantenimiento
export const crearMantenimiento = async (req: Request, res: Response) => {
  try {
    const mantenimiento: IMantenimiento = new Mantenimiento(req.body);
    await mantenimiento.save();
    res.status(201).json(mantenimiento);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error inesperado' });
    }
  }
};

// Obtener todos los mantenimientos
export const obtenerMantenimientos = async (req: Request, res: Response) => {
  try {
    const mantenimientos = await Mantenimiento.find();
    res.status(200).json(mantenimientos);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error inesperado' });
    }
  }
};

// Obtener un mantenimiento por ID
export const obtenerMantenimientoPorId = async (req: Request, res: Response) => {
  try {
    const mantenimiento = await Mantenimiento.findById(req.params.id);
    if (!mantenimiento) {
      return res.status(404).json({ message: 'Mantenimiento no encontrado' });
    }
    res.status(200).json(mantenimiento);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error inesperado' });
    }
  }
};

// Actualizar un mantenimiento
export const actualizarMantenimiento = async (req: Request, res: Response) => {
  try {
    const mantenimiento = await Mantenimiento.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!mantenimiento) {
      return res.status(404).json({ message: 'Mantenimiento no encontrado' });
    }
    res.status(200).json(mantenimiento);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error inesperado' });
    }
  }
};

// Eliminar un mantenimiento
export const eliminarMantenimiento = async (req: Request, res: Response) => {
  try {
    const mantenimiento = await Mantenimiento.findByIdAndDelete(req.params.id);
    if (!mantenimiento) {
      return res.status(404).json({ message: 'Mantenimiento no encontrado' });
    }
    res.status(200).json({ message: 'Mantenimiento eliminado con éxito' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error inesperado' });
    }
  }
};
