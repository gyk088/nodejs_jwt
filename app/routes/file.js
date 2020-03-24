const express = require('express');
const { file } = require('../controllers');
const { auth } = require('../middleware');

const router = express.Router();

router.use(auth);

router.post('/upload', file.upload);

router.get('/list', file.list);

router.delete('/delete/:id', file.remove);

router.get('/:id', file.get);

router.get('/download/:id', file.download);

router.put('/update/:id', file.update);

module.exports = router;
