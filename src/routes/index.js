var express = require('express');
var router = express.Router();
const Test = require('../services/test');

router.get('/', async function(req, res) {
  const response = await Test.testService();

  res.send(response);
});

module.exports = router;
