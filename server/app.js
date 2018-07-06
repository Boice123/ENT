require("./util/init.js");
var initLogger = getLogger('init');
var express = require('express');
var fs = require('fs');
var path = require('path');
// var favicon = /require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var co = require('co');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'pug');

//TODO 本地处理跨域,不用nginx等反向代理的时候可用
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Server", "apache");
  res.header("X-Powered-By", 'slotmachine 1.0');
  next();
});

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));
app.set('trust proxy', 1);

var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var redisOptions = {
    host: Config.session.redisHost,
    port: Config.session.redisPort,
    db: Config.session.redisDb,
    ttl: Config.session.redisTtl
};

app.use(session({
  store: new RedisStore(redisOptions),
  secret: Config.session.secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
      secure: false,
      maxAge: Config.session.maxAge
  }
}));

//过滤器
var urlParser = require('url');
// var userFilter = require('./filter/userFilter.js');
// var adminFilter = require('./filter/adminFilter.js');
app.use(function (req, res, next) {
    var url = urlParser.parse(req.url);
    if (url.pathname.indexOf('/api') >= 0 && typeof userFilter === 'function') {
        userFilter(req, res, next);
    } else if (url.pathname.indexOf('/admin') >= 0 && typeof adminFilter === 'function') {
        adminFilter(req, res, next);
    } else {
        next();
    }
});

app.locals.basedir = path.join(__dirname, 'view');
// 控制器部分
initController(path.join(__dirname, 'controller'));

function initController(dir) {
  fs.readdirSync(dir)
      .filter(function (file) {
          return file.indexOf(".") !== 0;
      })
      .forEach(function (file) {
          var stat = fs.statSync(path.join(dir, file));
          if (stat.isDirectory()) {
              initController(path.join(dir, file));
          } else {
              var uri = dir.replace(path.join(__dirname, 'controller'), '').replace(/\\/g, '/');
              var router = require(path.join(dir, file));
              if (file === 'index.js') {
                  //特殊处理index 保证/和/index都可访问
                  app.use(uri + '/', router);
              }
              uri = uri + '/' + file.substr(0, file.indexOf('.js'));
              app.use(uri, router);

          }
      });
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;