import { Request, Response } from 'express';
import Equipo from '../models/Equipo';
import { IEquipo } from '../interfaces/IEquipo';

// Crear un nuevo equipo
export const crearEquipo = async (req: Request, res: Response) => {
  try {
    const equipo: IEquipo = new Equipo(req.body);
    await equipo.save();
    res.status(201).json(equipo);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error inesperado' });
    }
  }
};

// Obtener todos los equipos
export const obtenerEquipos = async (req: Request, res: Response) => {
  try {
    const equipos = await Equipo.find();
    res.status(200).json(equipos);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error inesperado' });
    }
  }
};

// Obtener un equipo por ID
export const obtenerEquipoPorId = async (req: Request, res: Response) => {
  try {
    const equipo = await Equipo.findById(req.params.id);
    if (!equipo) {
      return res.status(404).json({ message: 'Equipo no encontrado' });
    }
    res.status(200).json(equipo);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error inesperado' });
    }
  }
};

// Actualizar un equipo
export const actualizarEquipo = async (req: Request, res: Response) => {
  try {
    const equipo = await Equipo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!equipo) {
      return res.status(404).json({ message: 'Equipo no encontrado' });
    }
    res.status(200).json(equipo);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error inesperado' });
    }
  }
};

// Eliminar un equipo
export const eliminarEquipo = async (req: Request, res: Response) => {
  try {
    const equipo = await Equipo.findByIdAndDelete(req.params.id);
    if (!equipo) {
      return res.status(404).json({ message: 'Equipo no encontrado' });
    }
    res.status(200).json({ message: 'Equipo eliminado con éxito' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error inesperado' });
    }
  }
};
