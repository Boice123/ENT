"use strict";

// var configs = require('../config');

var fs = require("fs");
var path = require("path");
var cls = require('continuation-local-storage');
var clsNamespace = cls.createNamespace('storevideo');
var Sequelize = require("sequelize");
Sequelize.useCLS(clsNamespace)

var config = Config.mysql;
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db = {};

fs.readdirSync(__dirname)
.filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
})
.forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
});

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});
//60秒检测一次连接池
setInterval(() =>
        sequelize.query("SELECT SLEEP(1);").catch((e) => {
            console.log(config.username, config.password)
            console.log('Got an exception!', e)
        })
    , 60000
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
