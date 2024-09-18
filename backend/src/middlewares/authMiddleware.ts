import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_JWT_SEED || 'ññññññ';

// Middleware para autenticar al usuario
export const autenticarUsuario = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No se encontró el token.' });
  }

  try {
    const payload = jwt.verify(token, secretKey) as { id: string; email: string; rol: string };
    res.locals.user = payload; // Guarda el payload en res.locals
    next();
  } catch (error) {
    console.error('Error al verificar el token:', error); // Registro del error
    res.status(401).json({ message: 'Token inválido' });
  }
};

// Ruta protegida que usa el middleware
export const algunaRutaProtegida = (req: Request, res: Response) => {
  const user = res.locals.user;
  if (!user) {
    return res.status(401).json({ message: 'Usuario no autenticado' });
  }
  res.json({ message: `Hola, ${user.email}` });
};
