const { DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');
const sequelize = require('../sequelize');
const User = require('./user');
require('dotenv').config();

const Token = sequelize.define('token', {
  idUser: {
    type: DataTypes.STRING,
    field: 'id_user',
    references: {
      model: User,
      key: 'id',
    },
  },
}, {});

Token.createTokens = async (idUser) => ({
  accessToken: Token.createAccessToken(idUser),
  refreshToken: await Token.createRefreshToken(idUser),
});

Token.createAccessToken = (idUser) => jwt.sign({
  id: idUser,
  type: 'access',
}, process.env.SECRET_KEY, { expiresIn: '10m' });

Token.createRefreshToken = async (idUser) => {
  await Token.destroy({
    where: {
      idUser,
    },
  });

  const token = await Token.build({
    idUser,
  }).save();

  const refresToken = jwt.sign({
    id: token.id, type: 'refresh',
  }, process.env.SECRET_KEY, {
    expiresIn: '15m',
  });

  return refresToken;
};

Token.verifyRefreshToken = async (refreshToken) => {
  let payload;

  try {
    payload = jwt.verify(refreshToken, process.env.SECRET_KEY);
    if (payload.type !== 'refresh') {
      return {
        error: 'No refresh type',
      };
    }
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      return {
        error: 'Token expired',
      };
    } if (e instanceof jwt.JsonWebTokenError) {
      return {
        error: 'Invalid token',
      };
    }
  }

  const token = await Token.findByPk(payload.id);

  if (!token) {
    return {
      error: 'Invalid token',
    };
  }

  return token;
};

Token.verifyAccessToken = async (accessToken) => {
  let payload;

  try {
    payload = jwt.verify(accessToken, process.env.SECRET_KEY);
    if (payload.type !== 'access') {
      return {
        error: 'No access type',
      };
    }
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      return {
        error: 'Token expired',
      };
    } if (e instanceof jwt.JsonWebTokenError) {
      return {
        error: 'Invalid token',
      };
    }
  }

  return payload;
};

module.exports = Token;
