const routes = require('express').Router();

const { findAll } = require('../controllers/products');

routes.get('/', findAll);


module.exports = routes;