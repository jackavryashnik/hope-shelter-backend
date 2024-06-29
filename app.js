import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';

import statsRouter from './routes/statsRouter.js';
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
app.use(cookieParser());

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
