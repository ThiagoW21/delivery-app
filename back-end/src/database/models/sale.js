'use strict';

const SaleSchema = (sequelize, DataTypes) => {
  const SaleTable = sequelize.define('sale', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,      
    },
    userId: DataTypes.INTEGER,
    sellerId: DataTypes.INTEGER,
    totalPrice: DataTypes.DECIMAL(9,2),
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    saleDate: DataTypes.DATE,
    status: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'sales',
    underscored: true,
  }
  );
  return SaleTable;
};

module.exports = SaleSchema;