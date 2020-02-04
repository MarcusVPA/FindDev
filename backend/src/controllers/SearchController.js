const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response){
        // Buscar todos devs em um raio de 10 KM
        // Filtrar por tecnologias
        const { latitude, longitude, techs } = request.query;

        const techsArray = parseStringAsArray(techs);

        //console.log(techsArray);

        const devs = await Dev.find({ // criando o filtro, é um objeto pois pode ter mais de uma tecnologia
            techs: { // Quero filtrar pelas tecnologias
                $in: techsArray, // quero encontrar se usuário tem estas tecnologias("techs") que estam dentro de "techsArray"
            //$in = é um operador lógico (mongo operators) do mongo
            },
            location: { // Quero filtrar pela localização
                $near: { // operador lógico que consegue encontrar objetos perto de uma localização
                    $geometry: { // o $near recebe 2 parâmetros ($geometry)
                        type: "Point",
                        coordinates: [longitude, latitude], // o mongo lida nessa ordem [longitude, latitude] respectivamente
                    },
                    $maxDistance: 100000, // 10000 m = 10 KM
                },
            },
        });

        return response.json({ devs });
    }
}