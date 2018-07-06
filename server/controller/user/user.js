var express = require('express');
var co = require('co');
var router = express.Router();

var fs = require('fs');

var logger = getLogger("user/user");

router.get('/listjson', function(req, res, next) {
    // res.send('user');
    co(function* () {
        var list = yield Model.User.findAll({
            // where: where,
            // offset: start,
            // limit: parseInt(size),
            // order: [['id', 'desc']]
        });
        var total = yield Model.User.count({});         

        var result = {
            status: 0,
            data: {
                list: Util.clone(list),
                total: total
            }
        }
        res.send(result);
    }).catch(function(err) {
        logger.error(err);
    });
});

module.exports = router;