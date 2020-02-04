const { Router } = require('express'); // importando apenas o Router que está dentro do modulo express
/*const axios = require('axios'); // Axios faz chamadas para outras API
const Dev = require('./models/Dev'); */
const DevController = require('./controllers/DevController'); // importando o DevController.js
const SearchController = require('./controllers/SearchController'); // importando o SearchController.js

const routes = Router(); // função Router

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store); // DevController = DevController.js, store = nome da função
routes.get('/search', SearchController.index);

module.exports = routes; // exportando o objeto de routes (as rotas acima)

/* Funções do Controllers 
INDEX = listar
SHOW = mostrar um único
STORE = criar
UPDATE = alterar
DESTROY = deletar
*/