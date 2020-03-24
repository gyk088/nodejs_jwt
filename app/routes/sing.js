const express = require('express');
const { sing } = require('../controllers');

const router = express.Router();

router.post('/signup', sing.signup);

router.post('/signin', sing.signin);

router.post('/signin/new_token', sing.newToken);

module.exports = router;
