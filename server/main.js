'use strict';

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _Form = require('./components/Form.vue');

var _Form2 = _interopRequireDefault(_Form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import './public/libs/icons/ionicons.scss'

_vue2.default.component('enter', _Form2.default);

new _vue2.default({
    el: '#app',
    data: {
        name: 'JUNO'
    }
});