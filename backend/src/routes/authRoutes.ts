import { Router } from 'express';
import { login } from '../controllers/authController';  // 
import { register } from '../controllers/authController';  // Añadir el controlador de registro

const router = Router();

// Ruta para iniciar sesión
router.post('/login', login);

// Ruta para registrar un nuevo usuario
router.post('/register', register);

export default router;
