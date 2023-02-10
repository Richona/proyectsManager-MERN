require('dotenv').config();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: __dirname + '/.env' });
}

const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const connectDB = require('./database/config');

const app = express();

const cors = require("cors");
const checkToken = require('./middlewares/checkToken');

const whiteList = [process.env.URL_FRONTEND, process.env.URL_FRONTEND2, process.env.URL_PRODUCTION]
const corsOptions = {
  origin: function (origin, cb) {
    if (whiteList.includes(origin)) {
      cb(null, true)
    } else {
      cb(new Error("Error de Cors"))
    }
  }
}

connectDB();

app
  .use(logger('dev'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(cors())

/* RUTAS */
app
  .use('/api/auth', require('./routes/auth'))
  .use('/api/users', checkToken, require('./routes/users'))
  .use('/api/projects', checkToken, require('./routes/projects'))
  .use('/api/tasks', checkToken, require('./routes/tasks'))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend', 'build')));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'build', 'index.html'));
  })
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({
    ok: false,
    msg: err.message ? err.message : 'Upss, hubo un error!'
  })
});

module.exports = app;
