import express from 'express';
import bedsCtrl from '../controllers/bedsCtrl.js';

const bedsRouter = express.Router();

bedsRouter.get('/beds', bedsCtrl.getAllBeds);
bedsRouter.patch('/beds', bedsCtrl.updateBeds);

export default bedsRouter;