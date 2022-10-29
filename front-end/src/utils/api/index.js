import axios from 'axios';

async function api(reqType, path, payload) {
  const { token } = JSON.parse(localStorage.getItem('user'));

  const configApi = axios.create({
    baseURL: `http://${process.env.REACT_APP_HOSTNAME}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

  const response = await configApi[reqType](path, payload);

  return response;
}

export default api;
