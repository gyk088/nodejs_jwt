
const { User, Token } = require('../models');
const { validate } = require('../helpers');

const signup = async (req, res) => {
  const { email, password, name } = req.body;
  if (validate.mail(email)) {
    let user = await User.findAll({
      where: {
        email,
      },
    });

    if (user && user.length) {
      res.status(403).json({
        error: `email: ${email} is exist`,
      });
    } else {
      user = await User.build({
        email, password, name, logout: true,
      }).save();
      res.json(user);
    }
  } else {
    res.status(403).json({
      error: 'validate email',
    });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.getUserByEmailAndPass(email, password);
  if (user.error) {
    res.status(403).json(user);
  } else {
    const tokens = await Token.createTokens(user.id);
    user.logout = false;
    user.save();
    res.json({ user, tokens });
  }
};

const newToken = async (req, res) => {
  const { refrshToken } = req.body;

  if (!refrshToken) {
    res.status(400).json({ error: 'Token is not exist' });
  }

  const token = await Token.verifyRefreshToken(refrshToken);

  if (token.error) {
    res.status(400).json(token);
  }

  const tokens = await Token.createTokens(token.idUser);

  res.json(tokens);
};


module.exports = { signup, signin, newToken };
