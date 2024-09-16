import { Request, Response } from 'express';
import Usuario from '../models/Usuario';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Iniciar sesión
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario || !(await usuario.compararContrasena(password))) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const token = jwt.sign({ id: usuario._id }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
