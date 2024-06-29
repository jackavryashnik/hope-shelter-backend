import fs from 'node:fs';
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import HttpError from './helpers/HttpError.js';

import statsRouter from './routes/statsRouter.js';
import authRouter from './routes/authRouter.js';

const swaggerDocument = JSON.parse(fs.readFileSync('./swagger.json', 'utf-8'));

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api/auth', authRouter);
app.use('/api', statsRouter(io));

app.use((req, res, next) => {
  next(HttpError(404, 'Route not found'));
});

app.use(async (err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

export { app, server };
