import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import {router} from './src/routes/index.js';

const server = express();

const corsOptions = {
    origin: 'http://127.0.0.1:5500',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

server.use(cors(corsOptions));

server.use(express.json({ limit: '50mb' }));
server.use(express.urlencoded({ limit: '50mb', extended: true }));
server.use(router);

server.listen(process.env.PORT||3333, () => console.log('App rodando!'));
