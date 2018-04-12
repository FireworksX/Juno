// import './public/libs/icons/ionicons.scss'

import Vue from 'vue'
import Form from './components/Form.vue'


Vue.component('enter', Form);

new Vue({
    el: '#app',
    data: {
        enterType: 'auth'
    }
});