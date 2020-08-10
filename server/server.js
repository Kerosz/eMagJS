import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import data from './data';
import config from './config';
import userRouter from './routers/userRouter';

mongoose
  .connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Connected to mongodb'))
  .catch((err) => console.log(err.reason));

const app = express();

app.use(cors());
app.use('/api/users', userRouter);
app.get('/api', (req, res) => {
  if (data) {
    res.send(data);
  } else {
    res.status(404).send({ message: 'Data Not Found' });
  }
});
app.get('/api/products/:id', (req, res) => {
  const product = data.products.find((query) => query.id === req.params.id);

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

app.listen(5000, () => {
  console.log(`
  Serve at http://localhost:5000
  Data at http://localhost:5000/api/
  `);
});
