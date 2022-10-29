const httpStatus = require('http-status');
const usersService = require('../services/usersService');

const usersController = {
  create: async (req, res) => {
    const data = usersService.validateBody(req.body);
    await usersService.userExists(data.email);

    const result = await usersService.create(data);

    res.status(201).json(result);
  },
  admCreate: async (req, res) => {
    const { logged, ...reqBody } = req.body;

    if (logged !== 'administrator') {
      return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Unauthorized user' });
    }

    const data = usersService.validateBody(reqBody);
    await usersService.userExists(data.email);

    const result = await usersService.create(data);

    res.status(201).json(result);
  },
  list: async (_req, res) => {
    const users = await usersService.list();
    res.status(200).json(users);
  },
  delete: async (req, res) => {
    const email = req.body.source;

    await usersService.delete(email);

    res.sendStatus(204);
  },

  getSellers: async (_req, res) => {
    const sellers = await usersService.getSellers();
    res.status(200).json(sellers);
  },
};

module.exports = usersController;