import { Request, Response } from 'express';
import Usuario from '../models/Usuario';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'your_jwt_secret_key';

export const login = async (req: Request, res: Response) => {
  const { email, contrasena } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const esValido = await usuario.compararContrasena(contrasena);
    if (!esValido) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: usuario._id, email: usuario.email }, secretKey, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error inesperado' });
    }
  }
};
