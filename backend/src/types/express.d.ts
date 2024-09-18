// src/types/express.d.ts
import { User } from '../models/Usuario'; // Ajusta según la ubicación de tu modelo

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
