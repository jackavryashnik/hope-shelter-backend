import express from 'express';
import authCtrl from '../controllers/authCtrl.js';

const authRouter = express.Router();

authRouter.post('/login', authCtrl.login);

export default authRouter;