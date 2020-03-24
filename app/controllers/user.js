
const { Token } = require('../models');

const info = (req, res) => {
  res.json(req.$user);
};

const logout = (req, res) => {
  req.$user.logout = true;
  req.$user.save();

  Token.destroy({
    where: {
      idUser: req.$user.id,
    },
  });

  res.status(401).send('logout');
};

module.exports = { info, logout };
