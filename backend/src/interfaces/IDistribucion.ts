import mongoose from 'mongoose';

export interface IDistribucion extends mongoose.Document {
  equipo_id: mongoose.Types.ObjectId;
  fecha_distribucion: Date;
  destino: string;
  estado: string;
}
