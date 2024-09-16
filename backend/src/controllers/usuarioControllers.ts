import { Request, Response } from 'express';
import Usuario from '../models/Usuario';
import { IUsuario } from '../interfaces/IUsuario';

// Crear un nuevo usuario
export const crearUsuario = async (req: Request, res: Response) => {
  try {
    const usuario: IUsuario = new Usuario(req.body);
    await usuario.save();
    res.status(201).json(usuario);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error inesperado' });
    }
  }
};

// Obtener todos los usuarios
export const obtenerUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error inesperado' });
    }
  }
};

// Obtener un usuario por ID
export const obtenerUsuarioPorId = async (req: Request, res: Response) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(usuario);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error inesperado' });
    }
  }
};

// Actualizar un usuario
export const actualizarUsuario = async (req: Request, res: Response) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(usuario);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error inesperado' });
    }
  }
};

// Eliminar un usuario
export const eliminarUsuario = async (req: Request, res: Response) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Usuario eliminado con éxito' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error inesperado' });
    }
  }
};
