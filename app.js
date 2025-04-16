const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const { rest } = require('@feathersjs/express');
const configuration = require('@feathersjs/configuration');
const { cors, json, urlencoded, notFound, errorHandler } = require('@feathersjs/express');

const path = require('path');
const bodyParser = require('body-parser');
const compression = require('compression');

// Archivos locales
const { logger } = require('./logger');
const { logError } = require('./hooks/log-error');
const { mongooseConfig } = require('./mongoose');

// Crea la app Feathers basada en Express
const app = express(feathers());

// Carga la configuración desde config/default.json
app.configure(configuration());

// Configura EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares básicos
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

// Body-parser 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '..', 'public')));

// Compresión
app.use(compression());

// Conecta Mongoose
app.configure(mongooseConfig);

// Configura Feathers REST (crea endpoints /serviceName)
app.configure(rest());

const { testOneService } = require('./services/test1.service');
app.configure(testOneService);

const { testTwoService } = require('./services/test2.service');
app.configure(testTwoService);

// Hooks globales de Feathers 
app.hooks({
  around: {
    all: [logError]
  },
  before: {},
  after: {},
  error: {}
});

const usuariosSession = require('./routes/usuario.routes');
app.use('/usuarios', usuariosSession);

// Manejo de 404 y errores
app.use(notFound());
app.use(errorHandler({ logger }));

module.exports = app;