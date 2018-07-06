var express = require('express');
var co = require('co');
var router = express.Router();
var fs = require('fs');
var logger = getLogger("index");

router.get('/', function(req, res, next) {

});

// router.get('/login', function(req, res, next) {
//     var returnURL = req.query.returnURL || req.referer;
//     res.render('admin/login', {returnURL: returnURL});
// });

router.get('/logout', function(req, res, next) {
    try {
        req.session.admin = null;
        res.redirect("/admin/login");
    } catch (err) {
        logger.error(err);
    }
});

module.exports = router;
