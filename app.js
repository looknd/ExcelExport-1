require('dotenv').load();

var http = require('http');
var express = require('express');
var basicAuth = require('basic-auth');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var multiparty = require('connect-multiparty');

var routes = require('./backend/service/routes.js');
var service = require('./backend/service/service.js');

var app = module.exports = express();
var multipartyMiddleware = multiparty();

var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  next();
};

var auth = function (req, res, next) {
  var unauthorized = function (res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.send(401);
  };

  var user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  }

  if (process.env.userName === user.name && process.env.userPass === user.pass)
    next();
  else
    return unauthorized(res);
};

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
app.use(allowCrossDomain);
app.use(multipartyMiddleware);
app.use(bodyParser({limit: '50mb'}));
app.use(methodOverride());

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

app.get('/', routes.index);

app.post('/export', auth, service.createExcel);