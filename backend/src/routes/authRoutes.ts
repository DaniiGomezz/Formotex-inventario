import { Router } from 'express';
import { login } from '../controllers/authController';

const router = Router();

// Ruta para iniciar sesión
router.post('/login', login);

export default router;
