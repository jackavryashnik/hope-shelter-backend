import 'dotenv/config';
import fs from 'node:fs';
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import HttpError from './helpers/HttpError.js';

import authRouter from './routes/authRouter.js';
import adminRouter from './routes/adminRouter.js';
import handleSocketConnection from './routes/statsRouter.js';

const swaggerDocument = JSON.parse(fs.readFileSync('./swagger.json', 'utf-8'));
const API_URL = process.env.API_URL;

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: API_URL,
    methods: ['GET', 'POST'],
    credentials: true,
  },
  path: '/socket.io',
});

app.use(
  cors({
    credentials: true,
    headers: ['Content-Type'],
    allowedHeaders: [
      'Authorization',
      'Content-Type',
      'Access-Control-Allow-Origin',
    ],
    origin: API_URL,
    Headers: true,
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  })
);
app.use(express.json());
app.use(cookieParser());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

io.on('connection', handleSocketConnection);

app.use('/api/auth', authRouter);

app.use('/api/admin', adminRouter);

app.use((req, res, next) => {
  next(HttpError(404, 'Route not found'));
});

app.use(async (err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

export { app, server };
