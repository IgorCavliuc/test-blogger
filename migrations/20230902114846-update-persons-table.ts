import { QueryInterface, DataTypes, Sequelize } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface, sequelize: Sequelize) {
    await queryInterface.addColumn('persons', 'created_at', {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    });
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn('persons', 'created_at');
  },
};
