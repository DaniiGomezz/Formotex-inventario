import { Request, Response } from 'express';
import { UsuarioService } from '../services/UsuarioService';
import { IUsuario } from '../models/interfaces/IUsuario';
import bcrypt from 'bcryptjs';

export class UsuarioController {
  private usuarioService = new UsuarioService();

  // Método para registrar un nuevo usuario
  async registrarUsuario(req: Request, res: Response): Promise<Response> {
    try {
      const { nombre, apellido, dni, email, telefono, password } = req.body;

      // Validar si el email ya está registrado
      const emailExiste = await this.usuarioService.validarEmail(email);
      if (emailExiste) {
        return res.status(400).send('El email ya está registrado');
      }

      // Hashear la contraseña
      const hashedPassword = await this.usuarioService.hashearContraseña(password);

      // Crear el nuevo usuario
      const nuevoUsuario: IUsuario = {
        nombre,
        apellido,
        dni,
        email,
        telefono,
        password: hashedPassword,
        rol: 'usuario', // Por defecto, el rol es 'usuario'
      };

      await this.usuarioService.registrarUsuario(nuevoUsuario);

      return res.status(201).send('Usuario registrado con éxito');
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      return res.status(500).send('Error interno del servidor');
    }
  }

  // Método para obtener un usuario por su ID (solo para superadmin)
  async obtenerUsuario(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      // Verificar el rol del usuario autenticado
      const user = res.locals.user;
      if (user.rol !== 'superadmin') {
        return res.status(403).json({ message: 'Acceso denegado' });
      }

      // Obtener el usuario por ID
      const usuario = await this.usuarioService.obtenerUsuarioPorId(id);
      if (!usuario) {
        return res.status(404).send('Usuario no encontrado');
      }

      return res.json(usuario);
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
      return res.status(500).send('Error interno del servidor');
    }
  }

  // Método para actualizar un usuario (solo para superadmin)
  async actualizarUsuario(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { nombre, apellido, email, telefono, dni, password } = req.body;

      // Verificar el rol del usuario autenticado
      const user = res.locals.user;
      if (user.rol !== 'superadmin') {
        return res.status(403).json({ message: 'Acceso denegado' });
      }

      // Verificar si el usuario existe
      const usuario = await this.usuarioService.obtenerUsuarioPorId(id);
      if (!usuario) {
        return res.status(404).send('Usuario no encontrado');
      }

      // Hashear la nueva contraseña si se proporciona
      const hashedPassword = password ? await bcrypt.hash(password, 10) : usuario.password;

      // Actualizar el usuario
      const usuarioActualizado = await Usuario.findByIdAndUpdate(
        id,
        { nombre, apellido, email, telefono, dni, password: hashedPassword },
        { new: true }
      );

      return res.json(usuarioActualizado);
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      return res.status(500).send('Error interno del servidor');
    }
  }

  // Método para eliminar un usuario (solo para superadmin)
  async eliminarUsuario(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      // Verificar el rol del usuario autenticado
      const user = res.locals.user;
      if (user.rol !== 'superadmin') {
        return res.status(403).json({ message: 'Acceso denegado' });
      }

      // Verificar si el usuario existe
      const usuario = await this.usuarioService.obtenerUsuarioPorId(id);
      if (!usuario) {
        return res.status(404).send('Usuario no encontrado');
      }

      // Eliminar el usuario
      await this.usuarioService.eliminarUsuario(id);
      return res.status(200).send('Usuario eliminado con éxito');
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      return res.status(500).send('Error interno del servidor');
    }
  }
}
