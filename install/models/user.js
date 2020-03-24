
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    logout: DataTypes.BOOLEAN,
  }, {});
  user.associate = function (models) {
    // associations can be defined here
  };
  return user;
};
