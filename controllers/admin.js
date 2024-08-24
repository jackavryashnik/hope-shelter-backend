import jwt from 'jsonwebtoken';
import HttpError from '../helpers/HttpError.js';
import { UserModel } from '../schemas/userModel.js';

export const getUsers = async (req, res) => {
  const [bearer, token] = req.headers.authorization.split(' ');

  const decode = jwt.decode(token);

  if (!decode || !decode.id) {
    throw HttpError(400, 'Invalid token');
  }

  const user = await UserModel.findOne({ _id: decode.id });

  if (!user) {
    throw HttpError(401, 'User not found');
  }

  if (user.role !== 'superadmin') {
    throw HttpError(403, 'Access forbidden');
  }

  const users = await UserModel.find();

  res.status(201).json({
    users,
  });
};

export const patchUser = async (req, res) => {
  const [bearer, token] = req.headers.authorization.split(' ');

  const decode = jwt.decode(token);

  if (!decode || !decode.id) {
    throw HttpError(400, 'Invalid token');
  }

  const isRoleValid =
    req.body.role === 'user' ||
    req.body.role === 'admin' ||
    req.body.role === 'superadmin';

  if (!isRoleValid) {
    throw HttpError(403, 'Role invalid');
  }

  const user = await UserModel.findOne({ _id: decode.id });

  if (!user) {
    throw HttpError(401, 'User not found');
  }

  if (user.role !== 'superadmin') {
    throw HttpError(403, 'Access forbidden');
  }

  const updatedUser = await UserModel.findOneAndUpdate(
    { _id: req.body.id },
    { role: req.body.role }
  );

  res.status(201).send({ updatedUser });
};
