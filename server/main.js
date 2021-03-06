'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

require('./main.sass');

require('particles.js');

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = require('vue-router');

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _Form = require('./components/Form.vue');

var _Form2 = _interopRequireDefault(_Form);

var _Dashboard = require('./components/Dashboard.vue');

var _Dashboard2 = _interopRequireDefault(_Dashboard);

var _App = require('./components/App.vue');

var _App2 = _interopRequireDefault(_App);

var _Lessons = require('./components/Lessons.vue');

var _Lessons2 = _interopRequireDefault(_Lessons);

var _vueResource = require('vue-resource');

var _vueResource2 = _interopRequireDefault(_vueResource);

var _vueAgile = require('vue-agile');

var _vueAgile2 = _interopRequireDefault(_vueAgile);

var _vuebar = require('vuebar');

var _vuebar2 = _interopRequireDefault(_vuebar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//particlesJS.load('form__overlay', 'particlesjs-config.json');


_vue2.default.use(_vueResource2.default);
_vue2.default.use(_vueRouter2.default);
_vue2.default.use(_vueAgile2.default);
_vue2.default.use(_vuebar2.default);

var routes = [{ path: '/sign', component: _Form2.default }, { path: '/dashboard', component: _Dashboard2.default }, { path: '/lessons/:id', component: _Lessons2.default }, { path: '/', component: _App2.default, props: true }];

var router = new _vueRouter2.default({
    routes: routes
    // mode: 'history'
});

var vm = new _vue2.default({
    el: '#app',
    router: router,
    data: {
        profile: {},
        particlesBlur: false
    },
    methods: {
        getSession: function getSession() {
            var _this = this;

            this.$http.post("http://localhost:2000/profileAuto").then(function (res) {
                if (res.data !== false && _typeof(res.data) === 'object') {
                    _this.$router.replace('/');
                    _this.particlesBlur = false;
                } else {
                    _this.$router.replace('sign');
                }
            }, function (err) {
                console.log(err);
            });
        }
    },
    mounted: function mounted() {
        //this.getSession();
        this.$router.replace('/lessons/0');
        // this.particlesBlur = false;
    }
});

var socket = io.connect('http://localhost:2000');
socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
});