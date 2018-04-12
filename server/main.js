'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; // y

require('particles.js');

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _Form = require('./components/Form.vue');

var _Form2 = _interopRequireDefault(_Form);

var _Profile = require('./components/Profile.vue');

var _Profile2 = _interopRequireDefault(_Profile);

var _vueResource = require('vue-resource');

var _vueResource2 = _interopRequireDefault(_vueResource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

particlesJS.load('form__overlay', 'particlesjs-config.json', function () {
    return console.log('Particles enabled');
});

_vue2.default.component('enter', _Form2.default);
_vue2.default.component('profile', _Profile2.default);

_vue2.default.use(_vueResource2.default);

new _vue2.default({
    el: '#app',
    data: {
        formEnabled: false,
        particlesBlur: true
    },
    methods: {
        getProfile: function getProfile() {
            var _this = this;

            this.$http.post("http://localhost:2000/profile").then(function (res) {
                if (res.data !== '' && _typeof(res.data) === 'object') {
                    _this.formEnabled = false;
                }
            }, function (err) {
                console.log(err);
            });
        }
    },
    mounted: function mounted() {
        //this.getProfile();
    }
});