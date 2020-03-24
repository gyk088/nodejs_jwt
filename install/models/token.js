
module.exports = (sequelize, DataTypes) => {
  const token = sequelize.define('token', {
    id_user: DataTypes.INTEGER,
  }, {});
  token.associate = function (models) {
    // associations can be defined here
  };
  return token;
};
