import mongoose from 'mongoose';

export interface IMantenimiento extends mongoose.Document {
  equipo_id: mongoose.Types.ObjectId;
  fecha_mantenimiento: Date;
  descripcion: string;
  responsable: string;
  estado: string;
}
