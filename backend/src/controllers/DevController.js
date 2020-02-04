const axios = require('axios'); // Axios faz chamadas para outras API
const Dev = require('../models/Dev'); 
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = { // (named function) store é nome da função criada aqui
    
    async index(request, response){
        const devs = await Dev.find();

        return response.json(devs);
    },
    
    async store(request, response){ // rota devs, async pois a API pode demorar a responder. Usar arrow function
    
        const { github_username, techs, latitude, longitude } = request.body; // desestruturação, buscar a informação do github_username dentro do request.body
        
        let dev = await Dev.findOne({github_username}); // vai no banco de dados e encontra 1 dev baseado no github_username. O "let" pode ser sobreposto o "const" não

        if(!dev){ // Se o user não existe, faz o cadastro

            const apiResponse = await axios.get(`https://api.github.com/users/${ github_username }`); // await pois aguarda a resposta da chamada da API pode demorar. (Template Strings) Quando usa crase por volta de uma String, consegue colocar variaveis por dentro de uma string.
        
            //console.log(apiResponse.data);
        
            const { name = login, avatar_url, bio } = apiResponse.data; // se o nome não existir, será o login
        
            // console.log(name, avatar_url, bio, github_username);
        
            const techsArray = parseStringAsArray(techs);
        
            const location = { // está no PointSchema.js
                type: 'Point', 
                coordinates: [longitude, latitude],
            };
        
            dev = await Dev.create({ // Quando o nome da propriedade é o mesmo nome da variável não precisa repetir ex: github_username: github_username
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })

        }
    
        // return response.json({ message: 'Hello World' }); // json deve enviar um ojeto ou vetor
        return response.json(dev);
    }
}; 