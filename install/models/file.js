
module.exports = (sequelize, DataTypes) => {
  const file = sequelize.define('file', {
    name: DataTypes.STRING,
    ext: DataTypes.STRING,
    type: DataTypes.STRING,
    size: DataTypes.INTEGER,
  }, {});
  file.associate = function (models) {
    // associations can be defined here
  };
  return file;
};
