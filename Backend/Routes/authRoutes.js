const { login, register } = require('../Controllers/authController');

const Router = require('express').Router();

Router.post('/register', register);
Router.post('/login', login);


module.exports = Router;