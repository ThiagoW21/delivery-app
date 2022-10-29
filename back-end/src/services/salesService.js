const Joi = require('joi');
const { sequelize } = require('../database/models');
const db = require('../database/models');
const newError = require('./utils');

const statusError = newError('order doesnt exist or status is invalid', 'BadRequest', 400); 
const changeError = newError('Users can only change their own orders', 'Forbidden', 403);

const salesService = {
  validateBody: (data) => {
    const schema = Joi.object({
      sellerId: Joi.number().required(),
      totalPrice: Joi.number().required(),
      deliveryAddress: Joi.string().required(),
      deliveryNumber: Joi.string().required(),
      products: Joi.array().items(Joi.object({
          productId: Joi.number().required(),
          quantity: Joi.number().required(),
        })),
    });
    const { error, value } = schema.validate(data);
    if (error) {
      error.name = 'ValidationError';
      error.status = 400;
      throw error;
    }    
    return value;
  },
  create: async ({ ...data }) => {
    const { products, ...sales } = data;
    
    const result = await sequelize.transaction(async (t) => {
      const newSale = await db.sale.create({ ...sales }, { transaction: t });
      const saleId = newSale.dataValues.id;
      const prods = products.map((prs) => ({ saleId, ...prs }));
      await db.salesProducts.bulkCreate(prods, { transaction: t });
      return saleId;
    });

    const { saleDate } = await db.sale.findOne({ attributes: ['saleDate'], where: { id: result } });

    return { saleId: result, saleDate };
  },

  list: async (id, role) => {
    const query = {};

    if (role === 'seller') {
      query.sellerId = id;
    } else if (role === 'customer') {
      query.userId = id;
    }

    const sales = await db.sale.findAll({
      attributes: ['id', 'totalPrice', 'deliveryAddress', 'deliveryNumber', 'saleDate', 'status'],
      where: { ...query },
    });

    return sales;
  },

  getDetails: async (id) => {
    const saleDetails = await db.sale.findOne({
      attributes: ['id', 'totalPrice', 'deliveryAddress', 
      'deliveryNumber', 'saleDate', 'status', 'sellerId'],
      where: { id },
    });

    const { dataValues: { sellerId } } = saleDetails;
    const { name } = await db.user.findOne({ attributes: ['name'], where: { id: sellerId },
    });
    const salesProducts = await db.salesProducts.findAll({
      attributes: ['productId', 'quantity'], where: { saleId: id },
    });

    const newSalesProduct = await Promise.all(salesProducts.map(async ({ productId, quantity }) => {
      const product = await db.product.findOne({ 
        where: { id: productId }, attributes: ['name', 'price'],
      });

      return { productId, quantity, name: product.name, price: product.price };
    }));

    return { ...saleDetails.dataValues, salesProducts: newSalesProduct, sellerName: name };
  },

  update: async (id, idUser, newStatus) => {
    const sale = await db.sale.findOne({ where: { id } });
    const { dataValues: { status, sellerId } } = sale;

    if (!sale || status === 'entregue' || status === newStatus) throw statusError;
    if (idUser !== sellerId) throw changeError;

    await db.sale.update({ status: newStatus }, { where: { id } });
  },

  finish: async (id, idUser) => {
    const sale = await db.sale.findOne({ where: { id } });
    const { dataValues: { status, userId } } = sale;

    if (!sale || status === 'entregue') throw statusError;
    if (idUser !== userId) throw changeError;

    await db.sale.update({ status: 'Entregue' }, { where: { id } });
  },
};

module.exports = salesService;
