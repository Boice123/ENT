var express = require('express');
var co = require('co');
var router = express.Router();

var fs = require('fs');

var logger = getLogger("admin/admin");

router.get('/list', function(req, res, next) {
    // var admin = req.session.admin;
    co(function* () {
        var list = yield Model.Admin.findAll({
            // where: where,
            // offset: start,
            // limit: parseInt(size),
            // order: [['id', 'desc']]
        });
        var total = yield Model.Admin.count({});         

        var result = {
            status: 0,
            data: {
                list: Util.clone(list),
                total: total
            }
        }
        var data = {}
        data.list = JSON.stringify(result.data.list)
        res.render("admin/list", data)
    }).catch(function(err) {
        logger.error(err);
    });
});

router.get('/listjson', function(req, res, next) {
    var page = req.query.page || 1;
    var size = req.query.size || 10;
    var start = (page - 1) * size;
    co(function* () {
        var where = {};
        if (subject && subject != '') {
            where.subject = subject;
        }
        if (grade && grade != '') {
            where.grade = grade;
        }
        var list = yield Model.Admin.findAll({
            where: where,
            offset: start,
            limit: parseInt(size),
            order: [['id', 'desc']]
        });
        var total = yield Model.Admin.count({where: where});

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
router.get('/edit', function(req, res, next) {
    var admin = req.session.admin;
    co(function* () {
        var subjectList = yield SettingService.getSubjectList();

        var id = req.query.id;
        var editAdmin = {id: 0, username: '', name: "", head: "", grade: '', subject: '', password: ''};
        if (id > 0) {
            editAdmin = yield Model.Admin.findOne({
                where: {
                    id: id
                }
            });
            editAdmin.password = '';
        }
        var data = {};
        data.admin = admin;
        data.editAdmin = JSON.stringify(editAdmin);
        data.subjectList = JSON.stringify([].concat(subjectList));
        logger.info(data);
        res.render("admin/admin/edit", data)
    }).catch(function(err) {
        logger.error("编辑管理员错误");
        logger.error(err);
    });
})

router.post('/save', function(req, res, next) {
    // var admin = req.session.admin;
    co(function* () {
        var admin = req.body;
        var old = yield Model.Admin.findOne({where: {adminname: admin.adminname}});
        if (old != null) {
            res.send({status: 1, msg: "管理员账号已存在"});
            return;
        }
        // admin.password = Crypto.md5(admin.password);
        admin.status = 1;
        admin.addtime = new Date();
        admin.lasttime = new Date();
        yield Model.Admin.create(admin);
        var result = {status: 0, msg: '新增管理员成功'};
        res.send(result)
    }).catch(function(err) {
        logger.error("保存管理员错误");
        logger.error(err);
    });
})


router.post('/login', function(req, res, next) {
    var result = {status: -1, msg: '参数错误'};
    var adminname = req.body.adminname;
    var password = req.body.password;
    co(function* () {
        var admin = yield Model.Admin.findOne({where: {adminname: adminname}});
        if (admin) {
            if (password != admin.password) {
                result.status = -2;
                result.msg = '密码不正确';
                res.send(result);
                return;
            }
            yield Model.Admin.update({lasttime: new Date()}, {where: {id: admin.id}});
            result.status = 0;
            result.msg = '登录成功';
            // req.session.admin = Util.clone(admin);
            res.send(result);
        } else {
            result.status = -3;
            result.msg = '账号不存在';
            res.send(result);
        }
    });
});

module.exports = router;