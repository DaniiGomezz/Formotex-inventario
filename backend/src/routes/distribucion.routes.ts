import { Router } from 'express';
import {
  crearDistribucion,
  obtenerDistribuciones,
  obtenerDistribucionPorId,
  actualizarDistribucion,
  eliminarDistribucion
} from '../controllers/distribucionControllers';
import { autenticarUsuario } from '../middlewares/authMiddleware';

const router = Router();

// Rutas protegidas
router.post('/', autenticarUsuario, crearDistribucion);
router.get('/', autenticarUsuario, obtenerDistribuciones);
router.get('/:id', autenticarUsuario, obtenerDistribucionPorId);
router.put('/:id', autenticarUsuario, actualizarDistribucion);
router.delete('/:id', autenticarUsuario, eliminarDistribucion);

export default router;
