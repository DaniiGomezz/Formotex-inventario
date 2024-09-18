import { Router } from 'express';
import {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario
} from '../controllers/usuarioControllers';
import { autenticarUsuario } from '../middlewares/authMiddleware';

const routerUsuario = Router();

// Rutas protegidas
routerUsuario.post('/', autenticarUsuario, crearUsuario);
routerUsuario.get('/', autenticarUsuario, obtenerUsuarios);
routerUsuario.get('/:id', autenticarUsuario, obtenerUsuarioPorId);
routerUsuario.put('/:id', autenticarUsuario, actualizarUsuario);
routerUsuario.delete('/:id', autenticarUsuario, eliminarUsuario);

export default routerUsuario;
