import express from 'express';
import stats from '../controllers/stats.js';

const statsRouter = (io) => {
  const router = express.Router();

  router.get('/stats', (req, res, next) => stats.getStats(req, res, next, io));
  router.patch('/beds', (req, res, next) => stats.updateBeds(req, res, next, io));

  return router;
};

export default statsRouter;
