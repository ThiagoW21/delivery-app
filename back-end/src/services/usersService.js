const Joi = require('joi');
const md5 = require('md5');
const db = require('../database/models');
const jwtService = require('./jwtService');
const newError = require('./utils');

const usersService = {
  validateBody: (data) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      name: Joi.string().required().min(12),
      password: Joi.string().required().min(6),
      role: Joi.string().optional(),
    });

    const { error, value } = schema.validate(data);

    if (error) {
      error.name = 'ValidationError';
      error.status = 400;
      throw error;
    }
    
    return value;
  },

  userExists: async (email) => {
    const user = await db.user.findOne({ 
      where: { email }, 
    });

    if (user) {
      const error = newError('User already registered', 'ConflictError', 409);
      throw error;
    }
  },

  create: async ({ password, ...rest }) => {
    const passwordHash = md5(password);
    const user = await db.user.create({ ...rest, password: passwordHash });

    const { id, password: excPass, ...userWithoutPassword } = user.dataValues;

    const token = jwtService.createToken(id);

    return { token, ...userWithoutPassword };
  },
  list: async () => {
    const users = await db.user.findAll({ attributes: { exclude: ['password'] } });
    return users;
  },
  delete: async (email) => {
    await db.user.destroy({
      where: { email },
    });
  },

  getSellers: async () => {
    const sellers = await db.user.findAll({
      attributes: ['id', 'name'],
      where: { role: 'seller' },
    });
    return sellers;
  },
};

module.exports = usersService;