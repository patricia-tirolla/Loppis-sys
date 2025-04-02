import createError from 'http-errors';
import express from 'express';
import logger from 'morgan';

import indexRouter from './routes/index.js';

const app = express();

const PORT = 3001;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

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
  res.status(err.status || 500);
  res.send(res.locals.error);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT} 🚀`);
});

export default app;

