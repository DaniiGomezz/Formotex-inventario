import { Document } from 'mongoose';

export interface IOrganizacion extends Document {
  _id: string;
  nombre: string; // Nombre de la organización
  direccion: string; // Dirección opcional
 
}
