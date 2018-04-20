'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         Class for User: Register, Auth, Get session
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var regSchema = _mongoose2.default.model('users', {
    firstName: {
        type: String,
        default: 'User'
    },
    login: {
        type: String,
        require: true
    },
    mail: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        default: 0
    },
    visit: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        default: 'user'
    },
    registerDate: {
        type: Date,
        default: Date.now
    }
});

// let authSchema = mongoose.model('users', {
//     login: {
//         type: String,
//         require: true
//     },
//     password: {
//         type: String,
//         require: true
//     }
// });

var User = function () {
    function User() {
        _classCallCheck(this, User);
    }

    _createClass(User, [{
        key: 'auth',
        value: function auth(obj) {
            return new Promise(function (resolve, reject) {
                var findUser = regSchema({
                    login: obj.login,
                    password: obj.pass
                });
                regSchema.findOne({
                    login: obj.login
                }, function (err, result) {
                    if (err) {
                        throw err;
                    }

                    if (result === null) {
                        reject({ code: 454, type: 'failed', text: '\u041D\u0438\u043A\u043E\u0433\u043E \u0441 \u043B\u043E\u0433\u0438\u043D\u043E\u043C ' + obj.login + ' \u043C\u044B \u043D\u0435 \u043D\u0430\u0448\u043B\u0438. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437, \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u0432\u044B \u043E\u0448\u0438\u0431\u043B\u0438\u0441\u044C \u0438\u043B\u0438 \u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u0443\u0439\u0442\u0435\u0441\u044C \u044D\u0442\u043E \u0434\u0435\u043B\u043E 20 \u0441\u0435\u043A\u0443\u043D\u0434, \u043E\u0431\u0435\u0449\u0430\u0435\u043C.' });
                    } else {
                        if (result.password === obj.pass) {
                            resolve({ code: 202, type: 'success', text: '\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0441 \u043D\u0438\u043A\u043E\u043C ' + obj.login + ' \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D, \u043C\u044B \u0443\u0436\u0435 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u043B\u0438 \u0412\u0430\u0448\u0443 \u0441\u0435\u0441\u0441\u0438\u044E, \u0436\u0435\u043B\u0430\u0435\u043C \u0443\u0434\u0430\u0447\u0438!', object: result });
                        } else {
                            reject({ code: 455, type: 'failed', text: '\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F ' + obj.login + ' \u043C\u044B \u043D\u0430\u0448\u043B\u0438, \u043D\u043E \u043F\u0430\u0440\u043E\u043B\u044C \u0432\u0432\u0435\u0434\u0451\u043D \u043D\u0435 \u0432\u0435\u0440\u043D\u043E. \u041F\u043E\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0437\u0430\u043D\u043E\u0432\u043E, \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u0432\u044B \u043E\u0448\u0438\u0431\u043B\u0438\u0441\u044C, \u043C\u044B \u0436\u0434\u0451\u043C \u0432\u0430\u0441!' });
                        }
                    }
                });
            });
        }
        /*
            TODO: Добавить функцию Remove и Update
         */

    }, {
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
                        reject({ code: 452, type: 'failed', text: '\u041B\u043E\u0433\u0438\u043D ' + obj.login + ' \u0443\u0436\u0435 \u043A\u0435\u043C-\u0442\u043E \u0437\u0430\u043D\u044F\u0442. \u041C\u044B \u043F\u043E\u043D\u0438\u043C\u0430\u0435\u043C \u0447\u0442\u043E \u044D\u0442\u043E \u043A\u0440\u0443\u0442\u043E\u0439 \u043D\u0438\u043A\u043D\u0435\u0439\u043C, \u043D\u043E \u0412\u0430\u043C \u043F\u0440\u0438\u0434\u0451\u0442\u0441\u044F \u0432\u044B\u0431\u0440\u0430\u0442\u044C \u0434\u0440\u0443\u0433\u043E\u0439.' });
                    } else {

                        regSchema.find({
                            mail: obj.mail
                        }, function (err, checkmail) {
                            if (err) {
                                throw err;
                            }
                            if (_typeof(checkmail[0]) === 'object') {
                                reject({ code: 453, type: 'failed', text: '\u041F\u043E\u0447\u0442\u0430 ' + obj.mail + ' \u0443\u0436\u0435 \u043A\u0435\u043C-\u0442\u043E \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F, \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0443\u043A\u0430\u0437\u0430\u0442\u044C \u0434\u0443\u0433\u043E\u0439 \u0430\u0434\u0440\u0435\u0441 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u043F\u043E\u0447\u0442\u044B.' });
                            }

                            newUser.save(function (err) {
                                if (err) {
                                    reject({ code: 451, type: 'failed', text: 'Извените, это техническая ошибка, мы уже работаем над испралением ситуации.' });
                                    throw err;
                                }

                                resolve({ code: 201, type: 'success', text: obj.name + ' \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D \u043F\u043E\u0434 \u043D\u0438\u043A\u043E\u043C ' + obj.login + '. \u041C\u044B \u0440\u0430\u0434\u044B \u0432\u0438\u0434\u0435\u0442\u044C \u0442\u0435\u0431\u044F \u0432 \u043D\u0430\u0448\u0435\u0439 \u043A\u043E\u043C\u0430\u043D\u0434\u0435. \u0416\u0435\u043B\u0430\u0435\u043C \u0443\u0434\u0430\u0447\u0438!' });
                            });
                        });
                    }
                });
            });
        }
    }, {
        key: 'getProfile',
        value: function getProfile(obj) {
            return new Promise(function (resolve, reject) {
                console.log(obj.login);
                if (obj.login === '' || obj.login === 'undefined') {
                    reject({ code: 457, type: 'failed', text: 'Не удалось загрузить данные пользователя' });
                }

                regSchema.findOne({
                    login: obj.login
                }, function (err, result) {
                    if (err) {
                        throw err;
                    }
                    console.log(result);
                    if (result === null) {
                        reject({ code: 456, type: 'failed', text: 'Не удалось загрузить данные пользователя' });
                    } else {
                        resolve({ code: 203, type: 'success', text: 'Сессия успешно загружена', object: result });
                    }
                });
            });
        }
    }]);

    return User;
}();

module.exports = User;