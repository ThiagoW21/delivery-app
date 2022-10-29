const login = {
  email: 'zebirita@email.com',
  password: '1c37466c159755ce1fa181bd247cb925',
};

const wrongLogin = {
  email: 'wronglogin@wronglogin.com',
  password: 'wrong-login',
};

const user = {
  id: 3,
  name: 'Cliente Zé Birita',
  email: 'zebirita@email.com',
  role: 'customer',
};

const notFoundError = {
  status: 404,
  message: 'User or password not found',
};

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiRGVsaXZlcnkgQXBwIEFkbWluIiwiZW1haWwiOiJhZG1AZGVsaXZlcnlhcHAuY29tIiwicGFzc3dvcmQiOiJhNGM4NmVkZWNjNWFlZTA2ZWZmOGZkZWRhNjllMGQwNCIsInJvbGUiOiJhZG1pbmlzdHJhdG9yIn0.7PXH_N5g9R5vqMLtg82Ko769SEMjnpUlKfTgdbxnF-8';

module.exports = {
  login,
  wrongLogin,
  user,
  notFoundError,
  token
}