const router = require('express').Router();
const { validate } = require('./handlers');

router.get('/check', validate(), (req, res) => res.send({ status: 'goods' }));

module.exports = router;
