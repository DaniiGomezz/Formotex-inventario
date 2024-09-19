import bcrypt from 'bcrypt';
import { IUsuario } from '../models/interfaces/IUsuario'; // Asegúrate de importar la interfaz del usuario

const SALT_ROUNDS = 10;

// Middleware para hashear la contraseña
export function hashPassword(this: IUsuario, next: (err?: any) => void) {
  // 'this' ahora tiene el tipo de IUsuario

  // Solo hashear la contraseña si ha sido modificada o es nueva
  if (!this.isModified('password')) {
    return next();
  }

  // Hashear la contraseña antes de guardarla
  bcrypt.hash(this.password, SALT_ROUNDS, (err, hash) => {
    if (err) {
      return next(err);
    }

    // Reemplazar la contraseña plana con la hasheada
    this.password = hash;
    next();
  });
}
