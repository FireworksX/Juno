'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _pathsApp = require('./router/pathsApp');

var _pathsApp2 = _interopRequireDefault(_pathsApp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var http = require('http').Server(app);
var io = require('socket.io')(http);
//Save paths for app [page]


var urlEncodeParser = _bodyParser2.default.urlencoded({
    extended: false
});

app.set('views', _path2.default.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(_express2.default.static(__dirname + '/public'));
app.use((0, _cookieParser2.default)());
app.use((0, _expressSession2.default)({ secret: 'juno', resave: false, saveUninitialized: true }));

app.use('/', _pathsApp2.default);

http.listen(2000, function (err) {
    if (err) {
        throw err;
    }
    console.log('Server started on 2000 port');
});

_mongoose2.default.connect('mongodb://localhost/juno', function (err) {
    if (err) throw err;
    console.log('Mongoose conected');
});

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});