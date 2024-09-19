import { Document } from "mongoose";

export interface IRoles extends Document {
    _id: string;
    nombre_rol: string;
    descripcion: string;
}