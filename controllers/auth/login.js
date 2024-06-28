import bcryptjs from 'bcryptjs';

import { UserModel } from '../../schemas/userModel.js';
import { generateToken, saveToken } from '../../services/tokenService.js';
import HttpError from '../../helpers/HttpError.js';

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw HttpError(401, 'Email not found');
  }

  const comparePassword = bcryptjs.compare(password, user.password);

  if (!comparePassword) {
    throw HttpError(401, 'Wrong password');
  }

  const token = await generateToken({
    userName: user.userName,
    id: user._id,
  });

  await saveToken(user._id, token);

  res.status(201).json({
    user,
    token,
  });
};

export default login;
