import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'your_jwt_secret_key';

export const autenticarUsuario = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No se encontró el token.' });
  }

  try {
    const decoded = jwt.verify(token, secretKey as string);  // Asegúrate de que secretKey es de tipo string
    (req as any).usuario = decoded;
    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Token inválido.' });
    }
  }
};
