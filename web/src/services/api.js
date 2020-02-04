import axios from 'axios'; 

 const api = axios.create({ // com qual URL a API vai se comunicar
     baseURL: 'http://localhost:3333'
 }); 

 export default api;