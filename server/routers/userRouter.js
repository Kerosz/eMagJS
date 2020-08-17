/* eslint-disable no-underscore-dangle */
import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel';
import { generateToken, isAuth } from '../utils';

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
        birthday: signinUser.birthday,
        avatar: signinUser.avatar,
        isAdmin: signinUser.isAdmin,
        date: signinUser.date,
        token: generateToken(signinUser),
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
        name: createdUser.name,
        alias: createdUser.alias,
        phone: createdUser.phone,
        adresses: createdUser.adresses,
        birthday: createdUser.birthday,
        avatar: createdUser.avatar,
        isAdmin: createdUser.isAdmin,
        date: createdUser.date,
        token: generateToken(createdUser),
      });
    }
  })
);

userRouter.put(
  '/update',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.body.id);

    if (!user) {
      res.status(404).send({
        message: 'User not found',
      });
    } else {
      user.name = req.body.name;
      user.alias = req.body.alias;
      user.phone = req.body.phone;
      user.birthday = req.body.birthday;

      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;

      const updatedUserInfo = await user.save();

      res.send({
        _id: updatedUserInfo._id,
        username: updatedUserInfo.username,
        email: updatedUserInfo.email,
        name: updatedUserInfo.name,
        alias: updatedUserInfo.alias,
        phone: updatedUserInfo.phone,
        adresses: updatedUserInfo.adresses,
        birthday: updatedUserInfo.birthday,
        avatar: updatedUserInfo.avatar,
        isAdmin: updatedUserInfo.isAdmin,
        date: updatedUserInfo.date,
        token: generateToken(updatedUserInfo),
      });
    }
  })
);

export default userRouter;
