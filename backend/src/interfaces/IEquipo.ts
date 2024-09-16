import mongoose from 'mongoose';

export interface IEquipo extends mongoose.Document {
  nombre: string;
  modelo: string;
  numero_serie: string;
  estado: string;
  ubicacion: string;
  fecha_adquisicion: Date;
  fecha_ultimo_mantenimiento?: Date;
  notas?: string;
}
