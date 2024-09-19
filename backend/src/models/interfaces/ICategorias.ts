import { Document } from "mongoose";

export interface ICategorias extends Document {
    _id: string;
    nombre: string;
    descripcion: string;
}