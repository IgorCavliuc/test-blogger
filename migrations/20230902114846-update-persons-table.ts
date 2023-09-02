const { DataTypes } = require('sequelize');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('persons', 'created_at', {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW')
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('persons', 'created_at');
  }

};
