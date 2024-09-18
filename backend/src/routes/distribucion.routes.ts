import { Router } from 'express';
import {
  crearDistribucion,
  obtenerDistribuciones,
  obtenerDistribucionPorId,
  actualizarDistribucion,
  eliminarDistribucion
} from '../controllers/distribucionControllers';
import { autenticarUsuario } from '../middlewares/authMiddleware';

const routerDistribucion = Router();

// Rutas protegidas
routerDistribucion.post('/', autenticarUsuario, crearDistribucion);
routerDistribucion.get('/', autenticarUsuario, obtenerDistribuciones);
routerDistribucion.get('/:id', autenticarUsuario, obtenerDistribucionPorId);
routerDistribucion.put('/:id', autenticarUsuario, actualizarDistribucion);
routerDistribucion.delete('/:id', autenticarUsuario, eliminarDistribucion);

export default routerDistribucion;
