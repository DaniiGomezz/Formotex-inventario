import {Schema, model} from 'mongoose';

import { ICategorias } from '../interfaces/ICategorias';

const RolsesSchema = new Schema<ICategorias>({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true }

});

export const Categorias = model<ICategorias>('Categorias', RolsesSchema)