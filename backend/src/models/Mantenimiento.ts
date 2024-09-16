import mongoose, { Schema } from 'mongoose';
import { IMantenimiento } from '../interfaces/IMantenimiento';

const MantenimientoSchema: Schema = new Schema({
  equipo_id: { type: Schema.Types.ObjectId, ref: 'Equipo', required: true },
  fecha_mantenimiento: { type: Date, required: true },
  descripcion: { type: String, required: true },
  responsable: { type: String, required: true },
  estado: { type: String, required: true }
});

export default mongoose.model<IMantenimiento>('Mantenimiento', MantenimientoSchema);
