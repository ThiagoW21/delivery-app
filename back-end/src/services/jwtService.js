const jwt = require('jsonwebtoken');
const { readFileSync } = require('fs');
const newError = require('./utils');

const secretKey = readFileSync('jwt.evaluation.key', 'utf-8');
const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };

const jwtService = {
  createToken: (data) => {
    const token = jwt.sign({ ...data }, secretKey, jwtConfig);
    return token;
  },

  validateToken: (token) => {
    if (!token) {
      const error = newError('Empty Token', 'Unauthorized', 401);
      throw error;
    }

    try {
      const data = jwt.verify(token, secretKey);
      return data;
    } catch (e) {
      const error = newError('Invalid Token', 'Unauthorized', 401);
      throw error;
    }
  },  
};

module.exports = jwtService;