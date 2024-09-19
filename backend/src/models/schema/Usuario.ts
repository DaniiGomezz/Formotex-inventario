import {model, Schema} from "mongoose";
import { IUsuario } from "../interfaces/IUsuario";
import bcrypt from 'bcrypt';
import { Roles } from "./Roles";
import { hashPassword } from "../../middlewares/hashPassword";

const UsuarioSchema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  dni: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  telefono: { type: String, required: true, unique: true },
  rol: { type: Schema.Types.ObjectId, ref: 'Roles', required: true }, // referencia al modelo de roles
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true // Esto agregará automáticamente campos `createdAt` y `updatedAt`
});


// Middleware: Usar el middleware de hash antes de guardar
UsuarioSchema.pre('save', hashPassword);

// Método para comparar contraseñas
UsuarioSchema.methods.compararPassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};
export const Usuario = model<IUsuario>('Usuario', UsuarioSchema)