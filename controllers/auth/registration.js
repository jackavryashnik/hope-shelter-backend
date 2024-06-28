import bcryptjs from 'bcryptjs';

import { UserModel } from '../../schemas/userModel.js';
import { generateToken, saveToken } from '../../services/tokenService.js';
import HttpError from '../../helpers/HttpError.js';

const registration = async (req, res) => {
  const { email, password, userName } = req.body;
  const user = await UserModel.findOne({ email });

  const hashPassword = await bcryptjs.hash(password, 10);

  if (user) {
    throw HttpError(409, 'Email already exist');
  }

  const result = await UserModel.create({
    userName,
    email,
    password: hashPassword,
  });

  const token = await generateToken({
    userName: result.userName,
    id: result._id,
  });

  await saveToken(result._id, token);

  res.status(201).json({
    user: {
      email: result.email,
      id: result._id,
    },
    token,
  });
};

export default registration;
