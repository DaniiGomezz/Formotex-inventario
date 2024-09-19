import { Document } from "mongoose";
import { IEquipo } from "./IEquipo";

export interface  IDistribucion extends Document {
  _id: string;
  equipo:{
    _id: IEquipo['_id'];
    nombre: string;
    unidades: number;
  }
estado_envio: string;
organizacion : string;
fecha_envio: Date;
}