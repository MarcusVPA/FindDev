const express = require('express'); // importando o módulo express
const mongoose = require('mongoose'); // da acesso do NODE dentro de uma base mongo
const cors = require('cors'); // o cors da acesso ao NODE a outra portas, não somente ao localhost:3333 (backend)
const routes = require('./routes'); // caminho do diretório onde esta localizado routes.js

const app = express(); // express agora é uma função

mongoose.connect('mongodb+srv://omnistack:omnistack1@cluster0-6buzc.mongodb.net/semana-omnistack-10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use(cors()); //  { origin: 'http://localhost:3000' } se deixar "app.use(cors())" libera o acesso externo a todo tipo de aplicação;
app.use(express.json()); // express não entende json, por isso utiliza express.json(), e vem antes das rotas

app.use(routes); // todas as rotas da aplicação estão sendo usadas

app.listen(3333); // acessando a porta 3333


/* Métodos HTTP
GET = pegar informação
POST = criar informação
PUT =  editar informação
DELETE = deletar informação
 */ 

 /* Tipos de Parâmetros dentro do express
 Query Params (GET) = request.query são utilizados em filtros, ordenação, paginação
 Route Params (PUT, DELETE) = request.params são utilizados para identificar um recurso na alteração ou remoção
 Body (POST, PUT) = request.body são dados para criação ou alteração de um registro
 
 */