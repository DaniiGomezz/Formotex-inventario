import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUsuario } from '../interfaces/IUsuario';

const UsuarioSchema: Schema<IUsuario> = new Schema({
  nombre: { type: String, required: true },
  correo_electronico: { type: String, required: true, unique: true },
  telefono: { type: String, required: true },
  rol: { type: String, required: true, enum: ['admin', 'usuario'] }, // Enum para roles
  contrasena: { type: String, required: true }
});

// Comparar contraseñas
UsuarioSchema.methods.compararContrasena = async function(contrasena: string): Promise<boolean> {
  return bcrypt.compare(contrasena, this.contrasena as string);
};

// Encriptar la contraseña antes de guardar
UsuarioSchema.pre('save', async function(next) {
  if (!this.isModified('contrasena')) return next();
  const salt = await bcrypt.genSalt(10);
  this.contrasena = await bcrypt.hash(this.contrasena as string, salt);
  next();
});

export default mongoose.model<IUsuario>('Usuario', UsuarioSchema);
