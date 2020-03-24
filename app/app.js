const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const fileUpload = require('express-fileupload');
const cors = require('cors');
const { user, file, sing } = require('./routes');

app.use(cors());

app.use('/uploades', express.static('uploades'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(fileUpload());

module.exports = app;

app.use('/', sing);
app.use('/', user);
app.use('/file', file);

module.exports = app;
