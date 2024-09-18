import { Request, Response } from 'express';
import Usuario from '../models/Usuario';  // Asegúrate de que la ruta al modelo es correcta
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const secretKey = process.env.JWT_SECRET || 'ñññññ';

// Controlador de login
export const login = async (req: Request, res: Response) => {
  const { email, contrasena } = req.body;

  if (!email || !contrasena) {
    return res.status(400).json({ message: 'Email y contraseña son requeridos' });
  }

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ message: 'Credenciales incorrectas' });
    }

    // Usa el método `compararContrasena` del modelo
    const esValida = await usuario.compararContrasena(contrasena);
    if (!esValida) {
      return res.status(400).json({ message: 'Credenciales incorrectas' });
    }

    const token = jwt.sign({ id: usuario._id, email: usuario.email, rol: usuario.rol }, secretKey, {
      expiresIn: '1h'
    });

    res.json({
      message: 'Inicio de sesión exitoso',
      token,
      usuario: {
        id: usuario._id,
        email: usuario.email,
        rol: usuario.rol
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

// Controlador de registro
export const register = async (req: Request, res: Response) => {
  const { email, contrasena, nombre, telefono, rol } = req.body;

  if (!email || !contrasena || !nombre || !telefono || !rol) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  try {
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'El usuario ya está registrado' });
    }

    const nuevoUsuario = new Usuario({
      email,
      contrasena,
      nombre,
      telefono,
      rol
    });

    await nuevoUsuario.save();

    const token = jwt.sign({ id: nuevoUsuario._id, email: nuevoUsuario.email, rol: nuevoUsuario.rol }, secretKey, {
      expiresIn: '1h'
    });

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      token,
      usuario: {
        id: nuevoUsuario._id,
        email: nuevoUsuario.email,
        rol: nuevoUsuario.rol
      }
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};
