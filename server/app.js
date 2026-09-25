//Funcion para manejar errores en la aplicacion 
import createError from 'http-errors'
//Importar el framework express
import express from 'express'
//Imprtar modulos para el manejo de rutas
import path from 'node:path'
//Importar modulos para el manejo de cookies 
import cookieParser from 'cookie-parser'
//Importar modulos para el manejo de logs
import logger from 'morgan'
//Import para crear Dirname
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path';

//Creando la variable 
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Importar las rutas de la aplicacion
import indexRouter from './routes/index.js'
import usersRouter from './routes/users.js'


//Crea la aplicacion express
var app = express();

//Configura el motor de vistas 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//configura la carpeta de archivos estaticos
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//module.exports = app;
export default app;