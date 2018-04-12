// y

import 'particles.js'
import Vue from 'vue'
import Form from './components/Form.vue'
import Profile from './components/Profile.vue'
import VueResource from 'vue-resource'

particlesJS.load('form__overlay', 'particlesjs-config.json', () => console.log('Particles enabled'));

Vue.component('enter', Form);
Vue.component('profile', Profile);

Vue.use(VueResource);

new Vue({
    el: '#app',
    data: {
        formEnabled: false,
        particlesBlur: true,
    },
    methods: {
        getProfile () {
            this.$http.post("http://localhost:2000/profile").then( (res) => {
                if(res.data !== '' && typeof res.data === 'object'){
                    this.formEnabled = false;
                }
            }, (err) => {
                console.log(err);
            });
        }
    },
    mounted() {
        //this.getProfile();
    }
});