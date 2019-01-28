require('dotenv').load();
const express = require('express');
const passport = require('passport');
const { errorHandlerMiddleware } = require('./common/middlewares');
const { accountConfig } = require('./account/config');
const { authStrategy } = require('./account/middlewares');
const accountRouter = require('./account/accountRouter');
const todoRouter = require('./todo/todoRouter');
const bootstrap = require('./bootstrap');

const app = express();
bootstrap();

passport.use(authStrategy);

app.use(express.json());
app.use(passport.initialize(accountConfig.passport.initialization));
app.use(accountRouter);
app.use(todoRouter);
app.use(errorHandlerMiddleware);

module.exports = app;
