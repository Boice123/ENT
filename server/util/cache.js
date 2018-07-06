var redis = require("redis");
var bluebird = require("bluebird");

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
var _prefix = "";

function Cache(prefix) {
    this.TIME_2H = 7200;
    this.TIME_1H = 3600;
    this.TIME_30H = 1800;
    this._redis = this._redis ? this._redis : redis.createClient(Config.redis.port, Config.redis.host);
    if (prefix) {
        _prefix = prefix;
    }
}

/**
 * !!!!!全部返回promise对象,直接执行需要加then，否则用co同步执行
 */
Cache.prototype.keys = function() {
    return this._redis.keysAsync();
}

Cache.prototype.get = function(k) {
    return this._redis.getAsync(_prefix + k);
};

Cache.prototype.set = function(k, v) {
    return this._redis.setAsync(_prefix + k, v);
};

Cache.prototype.expire = function(k, interval) {
    return this._redis.expireAsync(_prefix + k, interval);
};

Cache.prototype.del = function(k) {
    return this._redis.delAsync(_prefix + k);
};

module.exports = Cache;