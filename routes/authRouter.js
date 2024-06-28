import express from 'express';

import ctrlWrapper from '../helpers/ctrlWrapper.js';
import registration from '../controllers/auth/registration.js';
import login from '../controllers/auth/login.js';

const router = express.Router();

router.post('/login', ctrlWrapper(login));
router.post('/register', ctrlWrapper(registration));

export default router;
