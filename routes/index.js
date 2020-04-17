var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/info', function(req, res, next) {
  return res.json({message: 'Coming from backend2'})
});

module.exports = router;
