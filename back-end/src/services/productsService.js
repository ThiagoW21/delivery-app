const db = require('../database/models');

const productsService = {
  getAll: async () => {
    const products = await db.product.findAll();
    return products;
  },
};

module.exports = productsService;
