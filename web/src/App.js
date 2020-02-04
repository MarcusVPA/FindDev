//import React, { useState } from 'react'; // useState é uma função utilizada pelo React para criar um ESTADO

/* 3 conceitos do React
COMPONENTE = é uma função que retorna algum conteudo HTML,CSS,Javascript
PROPRIEDADE = Informações que um componente PAI passa para o componente FILHO (são os atributos do HTML)
ESTADO = informação mantida, lida, atualizada pelo componente. (Imutabilidade)
*/
// <> </> fragments são tags são nomenclatura
// o React não fica monitorando as alterações de dentro das variáveis pra fazer a visualização, por isso o conceito de ESTADO

/*
function App() {
  const [counter, setCounter] = useState(0); // criação do ESTADO. A função useState devolve 1 vetor com 2 variaveis dentro dela (informações)
  function incrementCounter(){
    setCounter(counter + 1); // imutabilida = nunca altera o dado, sempre cria um novo dado a partir do valor anterior que tinha dele
  }

  return (
    <> 
<h1>Contador: {counter}</h1>
    <button onClick={incrementCounter}>Incrementar</button>
    </>
  );
}

export default App;
*/
// aside = tag do HATML pra crar sidebar
import React, { useState, useEffect } from 'react'; // useEffect possui 2 parâmetros, o primeiro é qual função ele precisa executar, o segundo é quando precisa executar
import api from './services/api';

import './global.css';  // tudo que for CSS não precisa do FROM quando fizer o import
import './App.css';
import './Sidebar.css';
import './Main.css';
import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

 /* navigator.geolocation.getCurrentPosition = está disponível de forma global na WEB */

function App() { 
  //   dispara uma função toda vez que uma informação é alterada

  const [devs, setDevs] = useState([]);  

  useEffect(() => {
    async function loadDevs(){
      const response = await api.get('/devs');

      setDevs(response.data);
    }
    loadDevs();
  }, []); 

  async function handleAddDev(data){
    // fetch = é uma API nativa do próprio navegador pra fazer chamadas
    // utilizaremos a AXIOS para fazer chamadas
    const response = await api.post('/devs', data) 
    
    //console.log(response.data);

    setDevs([...devs, response.data]); // "...devs" copia todos os devs que ja tenho no ESTADO e adiciona o novo dev no final usando "response.data" 
    // se fosse uma remoção de devs, usaríamos ".filter"
    // se fosse uma alteração de devs, usaríamos ".map"
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong> 
        <DevForm onSumit={handleAddDev} />
      </aside>

      <main>
        <ul> 
        {devs.map(dev => ( // chave declara o corpo da função, já parenteses é o retorno da função
          <DevItem key={dev._id} dev={dev} /> // a key={dev._id} veio pra cá, porque agora o DevItem é o nosso primeiro elemento dentro do MAP
        ))}
        </ul>
      </main>
    </div>
  );
}

export default App;