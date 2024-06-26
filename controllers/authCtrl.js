import HttpError from '../helpers/httpError.js';
import ctrlWrapper from '../helpers/ctrlWrapper.js';

const login = async (req, res, next) => {
  const { login, password } = req.body;

  const realLogin = process.env.USER_LOGIN;
  const realPassword = process.env.USER_PASSWORD;

  const formattedLogin = login.toLowerCase().trim();
  const formattedPassword = password.toLowerCase().trim();

  if (formattedLogin !== realLogin && formattedPassword !== realPassword) {
    throw HttpError(401, 'Email or password is wrong');
  }

  res.json({
    status: 'success',
    data: { message: 'User logged in' },
  });
};

export default { login: ctrlWrapper(login) };
