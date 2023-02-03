'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('companies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        unique: true,
        type: Sequelize.INTEGER,
      },
      companyID: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      companyName: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      ceoName: {
        type: Sequelize.STRING,
      },
      tags: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      score: {
        type: Sequelize.FLOAT,
      },
      comapanySector: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('companies');
  },
};
