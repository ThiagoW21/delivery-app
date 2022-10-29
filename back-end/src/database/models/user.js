'use strict';

const UserSchema = (sequelize, DataTypes) => {
  const UserTable = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,      
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'users'
  }
  );
  return UserTable;
};

module.exports = UserSchema;