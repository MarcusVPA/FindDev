import React from 'react'; // importando o react, pois utiliza HTML
import ReactDOM from 'react-dom'; // ReactDOM da habilidade do React se comunicar com a árvore de elementos da aplicação com HTML
import App from './App'; // App do nosso projeto


ReactDOM.render(<App />, document.getElementById('root')); // ReactDOM renderiza o arquivo App.js e coloca codigo HTML dentro da div root


