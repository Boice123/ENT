'use strict';
exports.randInt = function (min, max) {
    var range = max - min;
    // var rng = seedrandom();
    // var rand = rng();
    var rand = Math.random();
    return (min + Math.round(rand * range));
}

exports.inRange = function (randNum, rangeDatas) {
    // 查看randNum落在哪个区间
    // i.e: 0-10, 11-20, 20-
    // rangeDatas: [
    //  {"limit": 10},
    //  {"limit": 20},
    //  {},
    //  ]

    for (var index in rangeDatas) {
        var data = rangeDatas[index];
        var limit = data.limit;
        if (limit !== null && randNum < limit) {
            return index
        }
    }

    return rangeDatas.length - 1;
}

exports.randRange = function (infos, key = "limit", randMax = null) {
    var rangeDatas = [];
    var total = 0;

    Object.keys(infos).forEach(function(id) {
        var info = infos[id];
        let limit = info[key];
        total += limit;
        var rangeData = {"limit": total, "info": info};
        rangeDatas.push(rangeData);
    });

    total = (randMax !== null) ? randMax : total;
    var randNum = UTIL.randInt(0, total);
    var index = UTIL.inRange(randNum, rangeDatas);
    var rangeData = rangeDatas[index];

    return rangeData.info
}

exports.addZero = function (str, length) {
    return new Array(length - str.length + 1).join("0") + str;
}

/**
 * 将数值四舍五入(保留2位小数)后格式化成金额形式
 *
 * @param num 数值(Number或者String)
 * @return 金额格式的字符串,如'1,234,567.45'
 * @type String
 */
exports.formatCurrency = function (num) {
    num = num.toString().replace(/\$|\,/g, "");
    if (isNaN(num))
        num = "0";

    var sign = (num == (num = Math.abs(num)));
    var num = Math.floor(num * 100 + 0.50000000001);
    num = Math.floor(num / 100).toString();
    /*
     var cents = num % 100;
     if (cents < 10)
     cents = "0" + cents;
     */

    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num = num.substring(0, num.length - (4 * i + 3)) + "," + num.substring(num.length - (4 * i + 3));

    // return (((sign) ? "" : "-") + num + "." + cents);
    return (((sign) ? "" : "-") + num);
}

exports.randomString = function (length) {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var maxPos = chars.length;
    var nonceStr = "";
    for (var i = 0; i < (length || 32); i++) {
        nonceStr += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return nonceStr;
}

exports.randomNumber = function (length) {
    var chars = '0123456789';
    var maxPos = chars.length;
    var nonceStr = "";
    for (var i = 0; i < (length || 32); i++) {
        nonceStr += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return nonceStr;
}

exports.isBankPassword = function (str) {
    return /^\d{6}$/.test(str);
}
exports.getRemoteIp = function (req) {
    return req.header('X-Real-IP') || req.connection.remoteAddress || req.header('x-forwarded-for');
}

exports.clone = function (obj) {
    return JSON.parse(JSON.stringify(obj));
}

exports.isMobilePhone = function (str) {
    return /^1[35678]\d{9}$/.test(str);
}

exports.isEmail = function (str) {
    return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(str);
}

exports.hidePrivate = function (str) {
    if (this.isMobilePhone(str)) {
        str = '' + str;
        return str.substr(0, 3) + '****' + str.substr(7, 10);
    } else if (this.isEmail(str)) {
        var prefix = str.substr(0, str.indexOf('@'));
        var suffix = str.substr(str.indexOf('@'));
        if (prefix.length <= 3) {
            return prefix + '****' + suffix;
        } else {
            return prefix.substr(0, 3) + '****' + suffix;
        }
    } else {
        return str;
    }
}

exports.getLocalTime = function (date) {
    return new Date(date).format("yyyy-MM-dd hh:mm:ss");
}

exports.toThousands = function (num) {
    var num = (num || 0).toString();
    var temp = num.length % 3;
    switch (temp) {
        case 1:
            num = '00' + num;
            break;
        case 2:
            num = '0' + num;
            break;
    }
    return num.match(/\d{3}/g).join(',').replace(/^0+/, '');
}

// 矩阵变换
exports.transformMatrix = function (results) {
    var matrix = [];
    for (var col = 0; col < results[0].length; col++) {
        var list = [];
        for (var row = 0; row < results.length; row++) {
            list.push(results[row][col]);
        }
        matrix.push(list);
    }
    return matrix;
}

// 效率一般般
Array.prototype.count = function (value) {
    let count = 0;
    for (let index = 0; index < this.length; index++) {
        if (this[index] == value) {
            count += 1;
        }
    }
    return count;
}