const salesService = require('../services/salesService');
const newError = require('../services/utils');

const salesController = {
  create: async (req, res) => {
    const userId = res.authenticated.id;
    const data = salesService.validateBody(req.body);

    const result = await salesService.create({ ...data, userId });

    res.status(201).json(result);
  },

  list: async (_req, res) => {
    const { id, role } = res.authenticated;
    const result = await salesService.list(id, role);
    res.status(200).json(result);
  },

  getDetails: async (req, res) => {
    const { id } = req.params;
    const result = await salesService.getDetails(id);
    res.status(200).json(result);
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const idUser = res.authenticated.id;
    const { role } = res.authenticated;
    
    if (!['Preparando', 'Em Trânsito', 'Entregue'].includes(status)) {
      throw newError('invalid status', 'BadRequest', 400);
    }

    if (role === 'customer') await salesService.finish(id, idUser);

    if (role === 'seller') await salesService.update(id, idUser, status);

    res.status(202).end();
  },
};

module.exports = salesController;
