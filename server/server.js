const express = require('express');
const cors = require('cors');
const data = require('./Data.js');

const app = express();

app.use(cors());
app.get('/api', (req, res) => {
	res.send(data);
});

app.listen(5000, () => {
	console.log(`
  Server started at http://localhost:5000
  Data at http://localhost:5000/api/
  `);
});
