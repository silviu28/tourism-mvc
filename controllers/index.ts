import express from "express";
const path = require('path');
require('dotenv').config({ quiet: true });
const cors = require('cors');

const commentRouter = require('./comments');
const feedbackRouter = require('./feedback');
const priceRouter = require('./prices');
const userRouter = require('./users');

const PORT = 4004;

const app = express();
app.use(express.static(
  path.join(__dirname, '..', 'views')
));
app.use(express.json());
app.use(cors());

app.use(
  commentRouter,
  feedbackRouter,
  priceRouter,
  userRouter,
);

app.listen(PORT, () => {
  console.log(`Server running @ http://localhost:${PORT}`);
});