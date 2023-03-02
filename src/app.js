const express = require('express');
const userRouter = require('./routes/user');
const challengeRouter = require('./routes/challenge');

const app = express();

app.use(express.json());

app.use('/users', userRouter);
app.use('/challenges', challengeRouter);

module.exports = app;