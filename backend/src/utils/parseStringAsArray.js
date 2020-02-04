module.exports = function parseStringAsArray(arrayAsString){
    return arrayAsString.split(',').map(tech => tech.trim()); // slipt corta toda vez que tiver uma vírgula. Percorre o Array usando map, e pra cada um faz o tech.trim pra retirar os espaços antes e depois
};