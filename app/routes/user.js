const express = require('express');
const { user } = require('../controllers');
const { auth } = require('../middleware');

const router = express.Router();

router.use(auth);


router.get('/info', user.info);

router.get('/logout', user.logout);

module.exports = router;
