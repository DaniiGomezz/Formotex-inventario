import mongoose from 'mongoose';

export interface IUsuario extends mongoose.Document {
  nombre: string;
  correo_electronico: string;
  telefono: string;
  rol: string;
}
