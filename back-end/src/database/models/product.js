'use strict';

const ProductSchema = (sequelize, DataTypes) => {
  const ProductTable = sequelize.define('product', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,      
    },
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    price: DataTypes.DECIMAL(4,2),    
    urlImage: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'products',
    underscored: true
  }
  );
  return ProductTable;
};

module.exports = ProductSchema;