import mongoose, { Schema } from 'mongoose';
import { IEquipo } from '../interfaces/IEquipo';

const EquipoSchema: Schema = new Schema({
  nombre: { type: String, required: true },
  modelo: { type: String, required: true },
  numero_serie: { type: String, required: true, unique: true },
  estado: { type: String, required: true },
  ubicacion: { type: String, required: true },
  fecha_adquisicion: { type: Date, required: true },
  fecha_ultimo_mantenimiento: { type: Date },
  notas: { type: String }
});

export default mongoose.model<IEquipo>('Equipo', EquipoSchema);
