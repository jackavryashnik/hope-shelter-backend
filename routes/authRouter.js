import express from 'express';
import authCtrl from '../controllers/authCtrl.js';
import ctrlWrapper from '../helpers/ctrlWrapper.js';
import registration from '../controllers/auth/registration.js';

const router = express.Router();

router.post('/login', authCtrl.login);
router.post('/register', ctrlWrapper(registration));

export default router;
