import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://backend-biblioteca-1pbg.onrender.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});


export default apiClient;