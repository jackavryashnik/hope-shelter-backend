import express from 'express';
import bedsCtrl from '../controllers/bedsCtrl.js';

const bedsRouter = (io) => {
  const router = express.Router();

  router.get('/beds', (req, res, next) => bedsCtrl.getAllBeds(req, res, next, io));
  router.patch('/beds', (req, res, next) => bedsCtrl.updateBeds(req, res, next, io));

  return router;
};

export default bedsRouter;
