const express = require('express');
const userRouter = require('./routes/user');
const progressRouter = require('./routes/progress');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/users', userRouter);
app.use('/progress', progressRouter);

module.exports = app;