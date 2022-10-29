const loginService = require('../services/loginService');

const loginController = {
  login: async (req, res) => {
    const data = loginService.validateBody(req.body);
    const result = await loginService.login(data);
    res.status(200).json(result);
  },
};

module.exports = loginController;
