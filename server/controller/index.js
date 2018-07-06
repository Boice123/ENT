var express = require('express');
var co = require('co');
var router = express.Router();

router.get('/', function (req, res, next) {
	// res.render("index");
	res.render("admin/login")
});

module.exports = router;
