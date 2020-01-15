const { Router } = require('express');

const DevController = require('./controllers/DevController');

const SearchController = require('./controllers/SearchController');

const routes = Router();

// Rota que lista todos os devs cadastrados
routes.get('/devs', DevController.index);

// Rota de cadastro de devs
routes.post('/devs', DevController.store);

// Rota de busca
routes.get('/search', SearchController.index);


module.exports = routes;

