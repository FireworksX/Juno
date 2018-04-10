'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

router = _express2.default.Router();

var urlencoded = _bodyParser2.default.urlencoded({
    extended: false
});

router.get('/app', function (req, res) {
    res.send('APP!');
});

module.exports = router;