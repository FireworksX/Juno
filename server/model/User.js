'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         Class for User: Register, Auth, GetInfo
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var regSchema = _mongoose2.default.model('users', {
    firstName: String,
    login: String,
    mail: String,
    password: String
});

var User = function () {
    function User() {
        _classCallCheck(this, User);
    }

    _createClass(User, [{
        key: 'register',
        value: function register(obj) {
            return new Promise(function (resolve, reject) {
                var newUser = regSchema({
                    firstName: obj.name,
                    login: obj.login,
                    mail: obj.mail,
                    password: obj.pass
                });

                regSchema.find({
                    login: obj.login
                }, function (err, result) {
                    if (err) {
                        throw err;
                    }

                    if (_typeof(result[0]) === 'object') {
                        reject({ code: 452, text: '\u041B\u043E\u0433\u0438\u043D ' + obj.login + ' \u0443\u0436\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F' });
                    } else {

                        regSchema.find({
                            mail: obj.mail
                        }, function (err, checkmail) {
                            if (err) {
                                throw err;
                            }
                            console.log(checkmail);
                            if (_typeof(checkmail[0]) === 'object') {
                                reject({ code: 453, text: 'Данная почта уже используется' });
                            }

                            newUser.save(function (err) {
                                if (err) {
                                    reject({ code: 451, text: 'Техническая ошибка' });
                                    throw err;
                                }

                                resolve({ code: 201, text: obj.name + ', \u0434\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C!' });
                            });
                        });
                    }
                });
            });
        }
    }]);

    return User;
}();

module.exports = User;