
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('files', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    ext: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
    size: {
      type: Sequelize.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }, {
    charset: 'utf8',
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('files'),
};
