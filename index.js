require('dotenv').config();
const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const moment = require('moment');
const routes = require('./src/http/index');

const app = express();
logger.token('date', (req, res, tz) => moment().format());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use('/api', routes);

app.use((req, res, next) => res.status(404).send(createError(404)));
app.use((err, req, res, next) => {
  console.error(err);
  if (err.isBoom) {
    return res.status(err.output.statusCode).json(err.output.payload);
  } else {
    return res.status(500).send(createError(500));
  }
});
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV === 'development' ? err : {};
  res.status(err.status || 500);
});
module.exports = app;
