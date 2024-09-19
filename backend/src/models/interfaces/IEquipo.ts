import mongoose from 'mongoose';
import { IMarcas } from './IMarcas';
import { ICategorias } from './ICategorias';

export interface IEquipo extends mongoose.Document {
 _id: string;
 nombre: string;
 marca: IMarcas['_id'];
 categoria: ICategorias['_id'];
 unidades: number;
 
}
