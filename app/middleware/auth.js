const { Token, User } = require('../models');


const auth = async (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    res.status(401).json({ error: 'Token is not exist' });
    return;
  }

  const token = authHeader.replace('Bearer ', '');

  const payload = await Token.verifyAccessToken(token);
  if (payload.error) {
    res.status(401).json(payload);
    return;
  }


  const user = await User.findByPk(payload.id);

  if (!user) {
    res.status(401).json({ error: 'No such user' });
  }

  if (user.logout) {
    res.status(401).json({ error: 'Logged out' });
  }

  req.$user = user;

  next();
};

module.exports = auth;
