import express from 'express';

import ctrlWrapper from '../helpers/ctrlWrapper.js';
import registration from '../controllers/auth/registration.js';
import login from '../controllers/auth/login.js';
import logout from '../controllers/auth/logout.js';
import getUser from '../controllers/auth/getUser.js';
import { loginSchema, registrationSchema } from '../schemas/userModel.js';
import validationBody from '../middlewares/validationBody.js';

const router = express.Router();

router.post('/login', validationBody(loginSchema), ctrlWrapper(login));
router.post(
  '/register',
  validationBody(registrationSchema),
  ctrlWrapper(registration)
);
router.post('/logout', ctrlWrapper(logout));
router.post('/user', ctrlWrapper(getUser));

export default router;
