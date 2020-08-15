import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel';
import { generateToken } from '../utils';

const userRouter = express.Router();

userRouter.get(
  '/createnewadmin',
  expressAsyncHandler(async (req, res) => {
    try {
      const user = new User({
        username: 'administrator',
        email: 'admin@emagjs.ro',
        password: 'admin123',
        name: 'Administrator Account',
        alias: 'Admin',
        isAdmin: true,
        token: 'd261375e849a490b9d8cba07134b69ae',
      });

      const createdUser = await user.save();

      res.send(createdUser);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  })
);

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const signinUser = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });

    if (!signinUser) {
      res.status(401).send({
        message: 'Invalid credentials',
      });
    } else {
      res.send({
        _id: signinUser._id,
        username: signinUser.username,
        email: signinUser.email,
        name: signinUser.name,
        alias: signinUser.alias,
        phone: signinUser.phone,
        adresses: signinUser.adresses,
        date: signinUser.date,
        isAdmin: signinUser.isAdmin,
        token: signinUser.token,
      });
    }
  })
);

userRouter.post(
  '/register',
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    const createdUser = await user.save();

    if (!createdUser) {
      res.status(401).send({
        message: 'Invalid registration data',
      });
    } else {
      res.send({
        _id: createdUser._id,
        username: createdUser.username,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        token: generateToken(createdUser),
      });
    }
  })
);

export default userRouter;
