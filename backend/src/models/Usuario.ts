import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

interface IUsuario extends Document {
  email: string;
  contrasena: string;
  compararContrasena(contrasena: string): Promise<boolean>;
}

const UsuarioSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true }
});

// Comparar contraseñas
UsuarioSchema.methods.compararContrasena = async function(contrasena: string) {
  return bcrypt.compare(contrasena, this.contrasena);
};

// Encriptar contraseña antes de guardar
UsuarioSchema.pre('save', async function(next) {
  if (!this.isModified('contrasena')) return next();
  const salt = await bcrypt.genSalt(10);
  this.contrasena = await bcrypt.hash(this.contrasena, salt);
  next();
});

export default mongoose.model<IUsuario>('Usuario', UsuarioSchema);
