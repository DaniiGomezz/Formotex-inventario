import { Request, Response } from 'express';
import Usuario from '../models/Usuario';  // Asegúrate de que la ruta es correcta
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const secretKey = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Controlador de registro
export const register = async (req: Request, res: Response) => {
  const { email, contrasena, nombre, telefono, rol } = req.body;

  try {
    // Verifica si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'El usuario ya está registrado' });
    }

    // Crear el nuevo usuario
    const nuevoUsuario = new Usuario({
      email,
      contrasena: await bcrypt.hash(contrasena, 10),  // Hash de la contraseña
      nombre,
      telefono,
      rol
    });

    // Guardar el nuevo usuario en la base de datos
    await nuevoUsuario.save();

    // Generar el token JWT
    const token = jwt.sign({ id: nuevoUsuario._id, email: nuevoUsuario.email, rol: nuevoUsuario.rol }, secretKey, {
      expiresIn: '1h'
    });

    // Devolver el token y los datos del usuario
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
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};
