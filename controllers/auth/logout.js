import { removeToken } from '../../services/tokenService.js';

const logout = async (req, res) => {
  try {
    const { token } = req.cookies;
    console.log(token);
    const removedToken = removeToken(token);
    res.clearCookie('token');
    res.json({ message: 'Logout success' });
  } catch (error) {}
};

export default logout;
