require('dotenv').config();
const childProcess = require('child_process');

childProcess.execSync(`cd install && npx sequelize-cli db:create ${process.env.DB_NAME} && npx sequelize-cli db:migrate`).toString();
