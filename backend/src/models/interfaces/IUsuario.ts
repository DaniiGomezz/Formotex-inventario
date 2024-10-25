import { Document } from 'mongoose';
import { IRoles } from './IRoles';

export interface IUsuario extends Document {
  _id: string;
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  telefono: string;
  rol: IRoles['_id'];
  password: string;
  compararPassword(password: string): Promise<boolean>;
}

// Cuando se cra un usuario, usa `Omit` para excluir los métodos que no son necesarios.
export interface ICrearUsuario extends Omit<IUsuario, 'compararPassword' | '_id'> {}
