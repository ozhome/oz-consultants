import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-test.ozcandy.com.br',
});

api.interceptors.response.use(response => {
  const { NewErpID, NewErpToken, NewErpExpires } = response.headers;

  if (NewErpID && NewErpToken && NewErpExpires) {
    api.defaults.headers.ErpID = NewErpID;
    api.defaults.headers.ErpToken = NewErpToken;
    api.defaults.headers.ErpExpires = NewErpExpires;
  }
  return response;
});

export default api;
