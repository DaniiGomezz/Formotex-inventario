import { Document } from 'mongoose';

export interface IUsuario extends Document {
  nombre: string;
  email: string;
  telefono: string;
  rol: string;
  contrasena: string;
  compararContrasena(contrasena: string): Promise<boolean>;
}
