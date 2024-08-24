import express from 'express';

import ctrlWrapper from '../helpers/ctrlWrapper.js';
import { getUsers, patchUser } from '../controllers/admin.js';

const router = express.Router();

router.post('/', ctrlWrapper(getUsers));
router.patch('/', ctrlWrapper(patchUser));

export default router;
