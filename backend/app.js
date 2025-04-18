import createError from 'http-errors';
import express from 'express';
import logger from 'morgan';
import cors from 'cors'; 
import indexRouter from './routes/index.js';
import swaggerUI from 'swagger-ui-express';
import swaggerDocumentation from './swagger.json' assert { type: 'json' };

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocumentation, { explorer: true }));
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

export default app;

