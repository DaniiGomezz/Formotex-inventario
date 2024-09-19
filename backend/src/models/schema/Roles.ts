import {Schema, model} from 'mongoose';

import { IRoles } from '../interfaces/IRoles';

const RolsesSchema = new Schema<IRoles>({
   nombre_rol: { type: String, required: true },
   descripcion: { type: String, required: true }

});

export const Roles = model<IRoles>('Roles', RolsesSchema)