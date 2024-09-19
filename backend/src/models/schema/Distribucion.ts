import { Schema, model } from 'mongoose';
import { IDistribucion } from '../interfaces/IDistribucion'; // Asegúrate de importar la interfaz

const DistribucionSchema = new Schema<IDistribucion>({
  equipo: {
    _id: { type: Schema.Types.ObjectId, ref: 'Equipo', required: true }, // Referencia al modelo "Equipo"
    unidades: { type: Number, required: true, min: 0 } // Cantidad de unidades
  },
  estado_envio: { type: String, required: true }, // Estado del envío
  organizacion: { type: String, required: true }, // Organización que recibe la distribución
  fecha_envio: { type: Date, required: true } // Fecha de envío
});

// Crear el modelo de Distribucion
export const Distribucion = model<IDistribucion>('Distribucion', DistribucionSchema);
