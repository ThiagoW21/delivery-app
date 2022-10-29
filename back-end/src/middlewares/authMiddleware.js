const jwtService = require('../services/jwtService');

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  const jwt = jwtService.validateToken(authorization);
  res.authenticated = jwt;
  next();
};

module.exports = authMiddleware;
