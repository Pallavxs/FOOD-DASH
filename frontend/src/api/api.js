import axios from 'axios';

export const api = axios.create({   
    baseURL: 'http://10.75.179.116:3000/api', 
});

