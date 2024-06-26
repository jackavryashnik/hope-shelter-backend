import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { TokenModel } from '../schemas/tokenModel.js';

const { SECRET_KEY } = process.env;

export const generateToken = async payload => {
  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: '30d',
  });
  return token;
};

export const saveToken = async (userId, token) => {
  const newToken = TokenModel.create({ user: userId, token: token });
  return newToken;
};

export const removeToken = async token => {
  const tokenData = await TokenModel.deleteOne({ token });
  return tokenData;
};
