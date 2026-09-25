//const express = require('express');
import express from 'express';
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('<h1> style:"red"> LISTA DE AMIGOS Y EXES<h1>');
});

export default router;