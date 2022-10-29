'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users',
    [
      {
        id: 1,
        name: 'Delivery App Admin',
        email: 'adm@deliveryapp.com',
        password: '25d55ad283aa400af464c76d713c07ad',
        role: 'administrator'     
      },
      {
        id: 2,
        name: 'Fulana Pereira',
        email: 'fulana@deliveryapp.com',
        password: '25d55ad283aa400af464c76d713c07ad',
        role: 'seller'     
      },
      {
        id: 3,
        name: 'Cliente Zé Birita',
        email: 'zebirita@email.com',
        password: '25d55ad283aa400af464c76d713c07ad',
        role: 'customer'     
      },
    ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {    
    await queryInterface.bulkDelete('users', null, {});
  }
};
