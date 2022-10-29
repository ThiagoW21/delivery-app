'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        field: 'user_id',
        type: Sequelize.INTEGER,
        allowNull: false
      },
      sellerId: {
        field: 'seller_id',
        type: Sequelize.INTEGER,
        allowNull: false
      },
      totalPrice: {
        field: 'total_price',
        type: Sequelize.DECIMAL(9, 2),
        allowNull: false
      },
      deliveryAddress: {
        field: 'delivery_address',
        type: Sequelize.STRING,
        allowNull: false
      },
      deliveryNumber: {
        field: 'delivery_number',
        type: Sequelize.STRING,
        allowNull: false
      },
      saleDate: {
        field: 'sale_date',
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'Pendente',
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('sales')
  }
};
