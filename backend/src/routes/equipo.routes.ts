import e, { Router } from 'express';
import {
    actualizarEquipo, 
    crearEquipo, 
    eliminarEquipo,
     obtenerEquipoPorId,
      obtenerEquipos

  
} from '../controllers/equipoController';
import { autenticarUsuario } from '../middlewares/authJWT';

const routerEquipos = Router();

// Rutas protegidas
routerEquipos.post('/', autenticarUsuario, crearEquipo);
routerEquipos.get('/', autenticarUsuario, obtenerEquipos);
routerEquipos.get('/:id', autenticarUsuario, obtenerEquipoPorId);
routerEquipos.put('/:id', autenticarUsuario, actualizarEquipo);
routerEquipos.delete('/:id', autenticarUsuario, eliminarEquipo);

export default routerEquipos;
