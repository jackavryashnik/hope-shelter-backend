import express from 'express';
import cors from 'cors';

import HttpError from './helpers/httpError.js';
import bedsRouter from './routes/bedsRouter.js';
import authRouter from './routes/authRouter.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api', bedsRouter);

app.use((req, res, next) => {
  next(HttpError(404, 'Route not found'));
});

app.use((err, req, res, next) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

export default app;