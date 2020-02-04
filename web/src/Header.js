import React from 'react'; // ReactDOM da habilidade do React se comunicar com a árvore de elementos da aplicação com HTML

function Header(props) { // props são todas as PROPRIEDADES repassadas para esse COMPONENTE
    return <h1>{ props.title }</h1> // utiliza chaves {} para introduzir conteudo dentro do HTML
  }

export default Header;