import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { dbConnection } from './db/configDb';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes'; // Importar las rutas de autenticación
import routerDistribucion from './routes/distribucion.routes'; // Importar las rutas de equipos
import routerMantenimiento from './routes/mantenimiento.routes';
import routerUsuario from './routes/usuario.routes';
import routerEquipos from './routes/equipo.routes';

dotenv.config();

export class Server {
    private app: Application;
    private port: number;

    constructor() {
        this.app = express();
        this.port = parseInt(process.env.APP_PORT || '3000', 10); // Convertir a número y proporcionar valor predeterminado
        this.dbConnect();

        this.middlewares();
        this.routes(); // Añadir las rutas
    }

    // Conectar con la base de datos
    private async dbConnect() {
        await dbConnection();
    }

    // Definir middlewares
    private middlewares() {
        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    // Definir rutas
    private routes() {
        this.app.use('/auth', authRoutes);  // Rutas de autenticación
        this.app.use('/mantenimiento', routerMantenimiento );  // Rutas para equipos
        this.app.use('/distribucion', routerDistribucion );  // Rutas para distribuciones
        this.app.use('/usuario', routerUsuario );
        this.app.use('/equipo', routerEquipos );
    }

    // Iniciar el servidor
    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server on http://127.0.0.1:${this.port}`);
        });
    }
}
