import express from 'express';
import cors from 'cors';
import data from './data';

const app = express();

app.use(cors());
app.get('/api', (req, res) => {
  res.send(data);
});

app.listen(5000, () => {
  console.log(`
  Serve at http://localhost:5000
  Data at http://localhost:5000/api/
  `);
});
