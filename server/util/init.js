process.env.TZ = 'Asia/Shanghai';

var path = require('path');
// var cache = require(path.join(__dirname, 'cache.js'));

global.Config = require(path.join(__dirname, '..', 'resource', 'config.json'));
// global.Cache = new cache();

if (IS_TEST) {
    global.Config = require(path.join(__dirname, '..', 'resource', 'testConfig.json'));
    // global.Cache = new cache("TEST:");
}

global.getLogger = require(path.join(__dirname, 'getLogger.js'));

// global.Crypto = require('./crypto.js');
global.Util = require('./util.js');
// global.DateUtil = require('./dateUtil.js');

global.Model = require('../model');
// global.Transaction = require('../transaction');
//global.AlipayUtil = require('./alipayUtil.js');

// global.COMMON_CONST = require('../common/common_const');

// global.UserService = require('../service/userService.js');
// global.BankService = require('../service/bankService.js');
//global.ShuihuService = require('../service/game/shuihuService.js');
// global.SignService = require('../service/signService.js');
// global.NoticeService = require('../service/noticeService.js');
// global.PayService = require('../service/payService.js');
// global.StatisticService = require('../service/statisticService.js');
// global.AdminService = require('../service/adminService.js');
// global.GameService = require('../service/game_service.js');
