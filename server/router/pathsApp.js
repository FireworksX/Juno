'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _User = require('../model/User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var urlencoded = _bodyParser2.default.urlencoded({
    extended: false
});

var user = new _User2.default();

router.get('/app', function (req, res) {
    res.render('application');
});

router.post('/register', urlencoded, function (req, res) {
    user.register(req.body).then(function (resolve) {
        res.send(resolve);
    }, function (reject) {
        res.send(reject);
    });
});

router.post('/auth', urlencoded, function (req, res) {
    res.send({ code: 451, type: 'failed', text: 'Извените, это техническая ошибка, мы уже работаем над испралением ситуации.' });
});

module.exports = router;