import React from 'react';
import './styles.css';

function DevItem({ dev }){ // { dev } =  estamos pegando a propriedade dev. Outra maneira = function DevItem(props){
    // const{ devs } = props

    // <li key={dev._id} className="dev-item"></li> 

    return (
        <li className="dev-item"> 
            <header>
                <img src={dev.avatar_url} alt={dev.name}></img>
                <div className="user-info">
                    <strong>{dev.name}</strong>
                    <span>{dev.techs.join(', ')}</span> 
                </div>
            </header>
            <p>{dev.bio}</p>
            <a href={`https://github.com/${dev.github_username}`}> Acessar perfil no github</a>
        </li>
    );
}

export default DevItem;
