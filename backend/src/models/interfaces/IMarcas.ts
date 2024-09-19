import { Document } from "mongoose";

export interface IMarcas extends Document {
    _id: string;
    nombre: string;
    pais: string;
}