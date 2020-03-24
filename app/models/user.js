const { DataTypes } = require('sequelize');
const passwordHash = require('password-hash');
const sequelize = require('../sequelize');


const User = sequelize.define('user', {
  name: DataTypes.STRING,
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(val) {
      this.setDataValue('password', passwordHash.generate(val));
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  logout: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {});

User.getUserByEmailAndPass = async (email, pass) => {
  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (user && passwordHash.verify(pass, user.password)) {
    return user;
  }
  return { error: 'Password is not correct' };
};


module.exports = User;
