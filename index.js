const app = require('./app/app');
const sequelize = require('./app/sequelize');
require('dotenv').config();

sequelize.authenticate().then(() => {
  // eslint-disable-next-line
  console.log('Connection to the database successfully');
  // eslint-disable-next-line
  app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));
}).catch((err) => {
  // eslint-disable-next-line
  console.error('Unable to connect to the database:', err);
});
