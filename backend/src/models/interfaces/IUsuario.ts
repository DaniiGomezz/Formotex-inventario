import { Document } from 'mongoose';
import { IRoles } from './IRoles';
export interface IUsuario extends Document {
  _id: string;
  nombre: string;
  apellido: string; 
  dni: string;
  email: string;
  telefono: string;
  rol: IRoles ['_id'];
  password: string;
  compararPassword(password: string): Promise<boolean>;
}
