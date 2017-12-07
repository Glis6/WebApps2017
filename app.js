require('dotenv').config({path: './app.env'});

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

require('./models/Drawing');
require('./models/User');
require('./config/passport');

mongoose.connect(process.env.DATABASE_URL, {useMongoClient: true});

const index = require('./routes/index');
const user = require('./routes/user');

const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(passport.initialize());

app.use('/', index);
app.use('/API/user', user);
app.use(express.static(path.join(__dirname, 'dist')));

app.all('*', function (req, res) {
  const indexFile = path.join(__dirname, 'dist') + '/index.html';
  res.status(200).sendFile(indexFile);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
