const express = require('express');
const cors = require('cors');

const PORT = 4004;

const app = express();
app.use(cors);
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ y: 'i work' });
});

app.listen(PORT, () => {
  console.log(`--> localhost:${PORT}`);
});