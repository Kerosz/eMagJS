import jwt from 'jsonwebtoken';
import config from './config';

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    config.JWT_SECRET
  );
};

export const isAuth = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401).send({ message: 'The token was not found' });
  } else {
    const token = bearer.slice(7, bearer.length);
    jwt.verify(token, config.JWT_SECRET, (err, data) => {
      if (err) {
        res.status(401).send({ message: 'Invalid Token' });
      } else {
        req.user = data;
        next();
      }
    });
  }
};
