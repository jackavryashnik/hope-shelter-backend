import jwt from 'jsonwebtoken';
import { UserModel } from '../../schemas/userModel.js';
import HttpError from '../../helpers/HttpError.js';

const getUser = async (req, res) => {
  const { token } = req.body;
  const decode = jwt.decode(token);
  const id = decode.id;

  if (!decode || !decode.id) {
    throw HttpError(400, 'Invalid token');
  }

  const user = await UserModel.findOne({ _id: id });

  if (!user) {
    throw HttpError(401, 'User not found');
  }

  res.status(201).json({
    user,
  });
};

export default getUser;
