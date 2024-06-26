import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

import HttpError from './helpers/httpError.js';
import bedsRouter from './routes/bedsRouter.js';
import authRouter from './routes/authRouter.js';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api/auth', authRouter);
app.use('/api', bedsRouter(io));

app.use((req, res, next) => {
  next(HttpError(404, 'Route not found'));
});

app.use((err, req, res, next) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

export { app, server };
