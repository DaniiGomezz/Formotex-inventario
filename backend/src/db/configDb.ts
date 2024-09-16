import mongoose from "mongoose";


export const dbConnection = async () => {
    try {
        await mongoose.connect( process.env.DB_CNN as string );
        console.log('Base de datos Conectada');
    } catch (error) {
        console.log(error);
        throw new Error('Error al inicializar base de datos');
    }
}