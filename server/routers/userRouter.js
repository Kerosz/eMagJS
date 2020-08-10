import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel';
import { generateToken } from '../utils';

const userRouter = express.Router();

userRouter.get(
  '/admin',
  expressAsyncHandler(async (req, res) => {
    try {
      const user = new User({
        username: 'adminum',
        email: 'someemail@me.com',
        password: '1234',
        isAdmin: true,
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
        isAdmin: signinUser.isAdmin,
        token: generateToken(signinUser),
      });
    }
  })
);

export default userRouter;
