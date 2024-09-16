import { Router } from 'express';
import {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario
} from '../controllers/usuarioController';
import { autenticarUsuario } from '../middlewares/authMiddleware';

const router = Router();

// Rutas protegidas
router.post('/', autenticarUsuario, crearUsuario);
router.get('/', autenticarUsuario, obtenerUsuarios);
router.get('/:id', autenticarUsuario, obtenerUsuarioPorId);
router.put('/:id', autenticarUsuario, actualizarUsuario);
router.delete('/:id', autenticarUsuario, eliminarUsuario);

export default router;
