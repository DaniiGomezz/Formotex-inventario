import mongoose, { Schema } from 'mongoose';
import { } from '../interfaces/IDistribucion'
const DistribucionSchema: Schema = new Schema({
  equipo_id: { type: Schema.Types.ObjectId, ref: 'Equipo', required: true },
  fecha_distribucion: { type: Date, required: true },
  destino: { type: String, required: true },
  estado: { type: String, required: true }
});

export default mongoose.model<IDistribucion>('Distribucion', DistribucionSchema);
