/* eslint-disable no-underscore-dangle */
import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Newsletter from '../models/newsletterModel';

const newsletterRouter = express.Router();

newsletterRouter.post(
  '/subscribe',
  expressAsyncHandler(async (req, res) => {
    const subscription = new Newsletter({
      name: req.body.name,
      email: req.body.email,
    });

    const createdSubscription = await subscription.save();

    if (!createdSubscription) {
      res.status(401).send({ message: 'Invalid subscription data' });
    } else {
      res.send({
        _id: createdSubscription._id,
        name: createdSubscription.name,
        email: createdSubscription.email,
      });
    }
  })
);

export default newsletterRouter;
