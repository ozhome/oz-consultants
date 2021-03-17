import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-test.ozcandy.com.br',
});

api.defaults.headers.ErpID = '9875931d-7de9-4b1d-b745-8bee108698e8';

export default api;
