'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; // y

require('particles.js');

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = require('vue-router');

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _Form = require('./components/Form.vue');

var _Form2 = _interopRequireDefault(_Form);

var _Dashboard = require('./components/Dashboard.vue');

var _Dashboard2 = _interopRequireDefault(_Dashboard);

var _vueResource = require('vue-resource');

var _vueResource2 = _interopRequireDefault(_vueResource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

particlesJS.load('form__overlay', 'particlesjs-config.json', function () {
    return console.log('Particles enabled');
});

_vue2.default.use(_vueResource2.default);
_vue2.default.use(_vueRouter2.default);

var routes = [{ path: '/sign', component: _Form2.default }, { path: '/dashboard', component: _Dashboard2.default }];

var router = new _vueRouter2.default({
    routes: routes
    // mode: 'history'
});

new _vue2.default({
    el: '#app',
    router: router,
    data: {},
    methods: {
        getSession: function getSession() {
            this.$http.post("http://localhost:2000/profile").then(function (res) {
                if (res.data !== '' && _typeof(res.data) === 'object') {
                    console.log(res.data);
                }
                console.log(res);
            }, function (err) {
                console.log(err);
            });
        }
    },
    mounted: function mounted() {
        this.getSession();
    }
});