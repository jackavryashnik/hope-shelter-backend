import jwt from 'jsonwebtoken';
import 'dotenv/config';

import { TokenModel } from '../schemas/tokenModel.js';
import { UserModel } from '../schemas/userModel.js';

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;

  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    next(HttpError(401, 'Unauthorized'));
  }

  try {
    const { _id } = jwt.verify(token, SECRET_KEY);

    const user = await UserModel.findById(_id);

    const currentUserToken = TokenModel.findById(_id);

    if (!user || !currentUserToken) {
      next(HttpError(401, 'Unauthorized'));
    }
    req.user = user;

    next();
  } catch (error) {
    next(HttpError(401, error.message));
  }
};

export default authenticate;
