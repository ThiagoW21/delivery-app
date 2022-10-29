'use strict';

const SalesProductsSchema = (sequelize, DataTypes) => {
  const SalesProductsTable = sequelize.define('salesProducts', {
    saleId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    quantity: DataTypes.INTEGER,
  },
  {
    timestamps: false,
    tableName: 'sales_products',
    underscored: true,
  }
  );

  SalesProductsTable.associate = (models) => {
    models.product.belongsToMany(models.sale, {
      through: SalesProductsTable,
      foreignKey: 'productId',
      otherKey: 'saleId',
      as: 'sales'
    });

    models.sale.belongsToMany(models.product, {
      through: SalesProductsTable,
      foreignKey: 'saleId',
      otherKey: 'productId',
      as: 'products'
    });
  }

  return SalesProductsTable;
};

module.exports = SalesProductsSchema;