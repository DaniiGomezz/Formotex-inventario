import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'tu_clave_secreta'; // Reemplaza esto con tu clave secreta

export const autenticarUsuario = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado' });
  }

  try {
    const payload = jwt.verify(token, SECRET_KEY);
    req.user = payload; // Puedes agregar el usuario al request si es necesario
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
};
