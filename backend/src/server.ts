import express, { Application } from "express";
import cors from 'cors'
import morgan from "morgan";


import { dbConnection } from './db/configDb';

import dotenv from 'dotenv';
dotenv.config();

export class Server {

    private app: Application;
    private port: number;

    constructor() {

        this.app = express();
        this.port = parseInt(process.env.APP_PORT || '3000', 10); // Convertir a número y proporcionar valor predeterminado
        this.dbConnect();

        this.middlewares();
       
    }

    private async dbConnect(){
        await dbConnection()
    }

    private middlewares(){
        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }


    public listen(){
        this.app.listen(this.port, () => console.log(`Server on http://127.0.0.1:${this.port}`))
    }
}
