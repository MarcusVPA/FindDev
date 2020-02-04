const mongoose = require('mongoose'); // da acesso do node dentro de uma base mongo
const PointSchema= require('./utils/PointSchema');

// Schema é a estruturação de uma entidade dentro de um banco de dados
const DevSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String], // vetor de String 
    location: { 
        type: PointSchema,
        index: '2dsphere' // esfera 2d 
     },
});

// exportando o model "Dev", esse é o nome que vai ser salvo no banco de dados
module.exports = mongoose.model('Dev', DevSchema);