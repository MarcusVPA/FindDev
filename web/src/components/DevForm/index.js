import React, { useState, useEffect } from 'react';

function DevForm({ onSubmit }){
  
  
  const [github_username, setGitHubUsername] = useState('');
  const [techs, setTechs] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition( 
      (position) => {
        // console.log(position);
        const { latitude, longitude } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err)=>{
        console.log(err);
      },
      {
        timeout: 30000, // 30 segundos
      }
    );
  }, []);  // quando o vetor está vazio, a função executa somente uma vez

  async function handleSubmit(e){
    e.preventDefault();

    await onSubmit({
      github_username,
      techs,
      latitude,
      longitude, 
    });

    setGitHubUsername('');
    setTechs('');

  }

  return(

    <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do GitHub</label>
            <input 
              name="github_username" 
              id="github_username" 
              required 
              value={github_username}
              onChange={e => setGitHubUsername(e.target.value)}
            />  
          </div>
          
          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input 
              name="techs" 
              id="techs" 
              required 
              value={techs}
              onChange={e => setTechs(e.target.value)}
            />  
          </div>

          <div className="input-group"> 
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input 
                type="number" 
                name="latitude" 
                id="latitude" 
                value={latitude} 
                required
                onChange={e => setLatitude(e.target.value)} // pego o evento do HTML e da um setLatitude, e.target.value =  pega o valor do input
                />  
            </div>

            <div className="input-block">
              <label htmlFor="longitude">Latitude</label>
              <input 
              type="number" 
              name="longitude" 
              id="longitude" 
              value={longitude} 
              required 
              onChange={e => setLongitude(e.target.value)} // pego o evento do HTML e da um setLongitude, e.target.value =  pega o valor do input
              />  
            </div>
          </div>
          <button type="submit">Salvar</button>
        </form>
  );
}

export default DevForm;
