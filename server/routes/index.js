//const express = require('express');
import express from 'express';
import logger from '../lib/winston.js';

const indexRouter = express.Router();

let counter = 0;
const numbers = [];

/* GET home page. */
indexRouter.get('/', (req, res, _next) => {
  counter += 1;
  numbers.push(counter);
  res.render('index', {
    title: 'Daniel Alberto',
    counter,
    numbers,
  });
});

//rutas para pruebas de logs
//Acceder a GET /test-logs
indexRouter.get('/test-logs', (req, res) => {
  logger.error('Esto es un mensaje de ERROR - algo falló');
  logger.warn('Esto es un mensaje de WARN - algo podría estar mal');
  logger.info('Esto es un mensaje de INFO - operación exitosa');
  logger.http('Esto es un mensaje de HTTP - petición recibida');
  logger.debug('Esto es un mensaje de DEBUG - detalle de depuración');

  res.json({
    message: 'Logs de prueba generados. Revisa la consola y los archivos en ./logs',
    files: [
      'logs/app-YYYY-MM-DD.log  -> DailyRotateFile (info+warn+error en JSON)',
      'logs/app-readable.log    -> Formato legible (info+warn+error)',
      'logs/error.log           -> Solo errores',
    ],
  });
});

//rutas Rutas de prueba para eceptions y rejections
if (process.env.NODE_ENV !== 'production') {
  //RUta de prueba de ecepciones
  indexRouter.get('/test-exception', (req, res) => {
    res.json({ message: 'Excepcion lanzada. Revisa logs/exceptions.log' });
    setTimeout(() => {
      throw new Error('Excepcion de prueba');
    }, 100);
  });
  //prueba de una rejection
  indexRouter.get('/test-rejection', (req, res) => {
    res.json({ message: 'Promesa rechazada. Revisa logs/rejections.log' });
    //Promesa rechazada sin catch
    Promise.reject(new Error('Promesa rechazada de prueba sin catch'));
  });
}

//module.exports = router;
export default indexRouter;
