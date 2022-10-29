const Joi = require('joi');
const md5 = require('md5');
const db = require('../database/models');
const jwtService = require('./jwtService');
const newError = require('./utils');

const loginService = {
  validateBody: (data) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6),
    });

    const { error, value } = schema.validate(data);

    if (error) {
      error.name = 'ValidationError';
      error.status = 400;
      throw error;
    }
    
    return value;
  },

  login: async (data) => {
    const passwordHash = md5(data.password);
    const user = await db.user.findOne({ where: { email: data.email } });

    if (!user || user.password !== passwordHash) {
      const error = newError('Invalid user', 'NotFoundError', 404); 
      throw error;
    }

    const { password, ...clean } = user.dataValues;

    const token = jwtService.createToken(clean);

    return { token, ...clean };
  },
};

module.exports = loginService;
