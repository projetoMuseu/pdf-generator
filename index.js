import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import {router} from './src/routes/index.js';

const server = express();
server.use(cors());
server.use((req, res)=> {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
})

server.use(express.json({ limit: '50mb' }));
server.use(express.urlencoded({ limit: '50mb', extended: true }));
server.use(router);

server.listen(process.env.PORT||3333, () => console.log('App rodando!'));
