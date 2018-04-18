//

import 'particles.js'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Form from './components/Form.vue'
import Dashboard from './components/Dashboard.vue'
import App from './components/App.vue'
import Lessons from './components/Lessons.vue'
import VueResource from 'vue-resource'

particlesJS.load('form__overlay', 'particlesjs-config.json', () => console.log('Particles enabled'));



Vue.use(VueResource);
Vue.use(VueRouter);

const routes = [
    { path: '/sign', component: Form },
    { path: '/dashboard', component: Dashboard },
    { path: '/lessons/:id', component: Lessons },
    { path: '/', component: App, props: true },
];

const router = new VueRouter({
    routes,
    // mode: 'history'
});

let vm = new Vue({
    el: '#app',
    router,
    data: {
        profile: {},
        particlesBlur: false,
    },
    methods: {
        getSession () {
            this.$http.post("http://localhost:2000/profile").then( (res) => {
                if(res.data !== false && typeof res.data === 'object'){
                    this.$router.replace(`/`);
                    this.particlesBlur = false;
                }else{
                    this.$router.replace('sign')
                }
            }, (err) => {
                console.log(err);
            });
        }
    },
    mounted() {
        //this.getSession();
        this.$router.replace(`/lessons/0`);
        this.particlesBlur = false;
    }
});

