import { Router } from 'express';
import {
  crearMantenimiento,
  obtenerMantenimientos,
  obtenerMantenimientoPorId,
  actualizarMantenimiento,
  eliminarMantenimiento
} from '../controllers/mantenimientoController';
import { autenticarUsuario } from '../middlewares/authMiddleware';

const routerMantenimiento = Router();

// Rutas protegidas
routerMantenimiento.post('/', autenticarUsuario, crearMantenimiento);
routerMantenimiento.get('/', autenticarUsuario, obtenerMantenimientos);
routerMantenimiento.get('/:id', autenticarUsuario, obtenerMantenimientoPorId);
routerMantenimiento.put('/:id', autenticarUsuario, actualizarMantenimiento);
routerMantenimiento.delete('/:id', autenticarUsuario, eliminarMantenimiento);

export default routerMantenimiento;
